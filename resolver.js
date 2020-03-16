const fetch = require("node-fetch");
const NodeCache = require("node-cache");
const dotenv = require("dotenv");

dotenv.config();

let _config = {
  accessToken: {
    token: null,
    expires: null
  },
  baseUrl: process.env.BASE_URL,
  cacheTimeout: null,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  tokenUrl: process.env.TOKEN_URL
};

let cacheInSeconds = _config.cacheTimeout || 60;
let fetchCache = new NodeCache({
  stdTTL: cacheInSeconds, // seconds
  checkperiod: cacheInSeconds // seconds
});

const resolvers = {
  Query: {
    teams: (parent, args) => {
      const { id } = args;
      let url = `/teams/${id}`;
      return getData(url);
    },
    games: () => {
      let url = `/seasons/${2019}/games`;
      return getData(url);
    },
    articles: (parent, args) => {
      const { id } = args;
      let url = `/articles?teamIds%5B%5D=${id}`;
      return getData(url);
    },
    standing: () => {
      let url = `/seasons/${2019}/statistics/teams/standings`;
      return getData(url);
    },
    players: () => {
      let url = `/seasons/${2019}/statistics/players`;
      return getData(url);
    },
    goalkeepers: (parent, args) => {
      const { name } = args;
      let url = `/seasons/${2019}/statistics/goalkeepers?sort=${name}`;
      return getData(url);
    }
  }
};

function getData(url) {
  return new Promise((resolve, reject) => {
    const cachedData = fetchCache.get(url);
    if (cachedData) {
      console.log(`Returning cached data for: ${url}`);
      resolve(cachedData);
      return;
    }
    getToken()
      .then(() => {
        return fetch(`${_config.baseUrl}/${url}`, {
          headers: {
            Authorization: `bearer ${_config.accessToken.token}`
          }
        });
      })
      .then(res => {
        if (!res.ok) {
          console.log(`Invalid response: ${res.status} - ${res.statusText}`);
          reject(
            new Error(`Invalid response: ${res.status} - ${res.statusText}`)
          );
          return;
        }

        let dataPromise = res.json();
        resolve(dataPromise);
        return dataPromise;
      })
      .then(data => {
        console.log(`Caching result for ${url}`);
        fetchCache.set(url, data);
      });
  });
}
function setAccessToken(json) {
  let d = new Date();
  d.setSeconds(d.getSeconds() + json.expires_in);

  _config.accessToken.token = json.access_token;
  _config.accessToken.expires = d;
}

function getToken() {
  return new Promise((resolve, reject) => {
    if (hasValidToken()) {
      console.log("Using cached token");
      resolve();
      return;
    }

    console.log("Getting a new accessToken..");
    let body = `client_id=${_config.clientId}&client_secret=${_config.clientSecret}&grant_type=client_credentials`;

    fetch(_config.baseUrl + _config.tokenUrl, {
      method: "POST",
      body: body,
      headers: {
        "content-type": "application/x-www-form-urlencoded"
      }
    })
      .then(res => {
        if (!res.ok) {
          console.log(`Invalid response: ${res.status} - ${res.statusText}`);
          reject(
            new Error(`Invalid response: ${res.status} - ${res.statusText}`)
          );
        }
        return res.json();
      })
      .then(json => {
        setAccessToken(json);
        resolve();
      });
  });
}

function hasValidToken() {
  if (!_config.accessToken.expires) {
    return false;
  }
  return _config.accessToken.expires > new Date();
}

module.exports = resolvers;
