import { gql } from "apollo-boost";

const StandingTable = gql`
  {
    standing {
      team_code
      gp
      rank
      diff
      g
      ga
      non_reg_l
      non_reg_non_w
      non_reg_t
      non_reg_w
      otl
      ott
      otw
      points
      reg_l
      reg_t
      reg_w
      sol
      sow
    }
  }
`;

const PlayersStat = gql`
  {
    players {
      rank
      gp
      g
      a
      plus
      minus
      plus_minus
      tp
      pim
      bk_s
      ppg
      sog
      gwg
      hits
      toi
      toi_gp
      info {
        team_code
        first_name
        last_name
        number
        position
      }
    }
  }
`;

const GoalkeepersStat = gql`
  query($name: String) {
    goalkeepers(name: $name) {
      rank
      gp
      gpi
      rank
      ga
      gaa
      gs
      l
      mip
      so
      soga
      svs
      svsperc
      t
      valid_ranking
      w
      info {
        team_code
        first_name
        last_name
        number
      }
    }
  }
`;

const GamesTable = gql`
  {
    games {
      game_id
      home_team_code
      home_team_result
      away_team_code
      away_team_result
      start_date_time
      venue
      ticket_url
      game_type
      season
      series
      played
      penalty_shots
      overtime
      live_coverage_enabled
    }
  }
`;

export { StandingTable, PlayersStat, GoalkeepersStat, GamesTable };
