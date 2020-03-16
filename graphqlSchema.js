const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    teams(id: String): Teams!
    games: [Games]
    articles(id: String): [Articles]
    standing: [Standings]
    players: [Players]
    goalkeepers(name: String): [Goalkeepers]
  }

  type Players {
    player_id: Int
    gp: Int
    rank: Int
    toi: Int
    toi_gp: String
    g: Int
    a: Int
    bk_s: Int
    gwg: Int
    hits: Int
    minus: Int
    plus: Int
    pim: Int
    ppg: Int
    plus_minus: Int
    sog: Int
    tp: Int
    info: Info
  }

  type Goalkeepers {
    player_id: Int
    gp: Int
    gpi: Int
    rank: Int
    ga: Int
    gaa: Float
    gs: Int
    l: Int
    mip: String
    so: Int
    soga: Int
    svs: Int
    svsperc: Float
    t: Int
    valid_ranking: Boolean
    w: Int
    info: Info
  }

  type Info {
    team_code: String
    birthdate: String
    first_name: String
    last_name: String
    nationality: String
    number: Int
    position: String
    height: Int
    weight: Int
  }

  type Teams {
    facts: Facts
    players: [Player]
  }

  type Player {
    assistant: Boolean
    captain: Boolean
    date_of_birth: String
    default_jersey: Int
    player_id: String!
    first_name: String!
    last_name: String!
    height: Int
    weight: Int
    nationality: String
    position: String
    shoots: String
    shoots_right: Boolean
    short_description: String
    player_url_desktop: String
    player_url_mobile: String
  }

  type Facts {
    team_code: String
    chairman: String
    finals: String
    founded: String
    golds: String
    president: String
    accreditation: Accreditation
    contact: Contact
  }

  type Contact {
    address: String
    email: String
    phone: String
  }

  type Accreditation {
    contact_information: String
  }

  type Games {
    game_id: Int
    home_team_code: String
    home_team_result: Int
    away_team_code: String
    away_team_result: Int
    start_date_time: String
    venue: String
    ticket_url: String
    game_type: String
    season: String
    series: String
    played: Boolean
    penalty_shots: Boolean
    overtime: Boolean
    live_coverage_enabled: Boolean
    live: Live
  }

  type Live {
    game_id: Int
    arena: String
    attendance: Int
    home_score: Int
    away_score: Int
    home_team_code: String
    away_team_code: String
    gametime: String
    status_string: String
    round: Int
    period: Int
    time_period: Int
  }

  type Articles {
    article_id: String
    article_url: String
    publish_date: String!
    team_code: String
    title: String
    author: Author
  }

  type Author {
    email: String
    name: String
    title: String
  }

  type Standings {
    team_code: String
    gp: Int
    rank: Int
    diff: Int
    g: Int
    ga: Int
    non_reg_l: Int
    non_reg_non_w: Int
    non_reg_t: Int
    non_reg_w: Int
    otl: Int
    ott: Int
    otw: Int
    points: Int
    reg_l: Int
    reg_t: Int
    reg_w: Int
    sol: Int
    sow: Int
    team: Team
  }

  type Team {
    code: String
    id: String
  }
`;

module.exports = typeDefs;
