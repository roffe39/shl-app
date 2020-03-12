import React from "react";
import { Layout } from "../components/layout";
import { StatNavbar } from "../components/StatNavbar";
import { GamesTable } from "../queries/queries";
import { useQuery } from "react-apollo-hooks";
import { Table } from "react-bootstrap";
import teamMapping from "../team-mapping.json";
import infoMapping from "../info_mapping.json";

export const Game = () => {
  const { data } = useQuery(GamesTable);
  if (data) {
    const game = data.games.map(item => {
      if (item.game_type === "Regular season game") {
        return (
          <tr className="border_row border_bottom">
            <td className="row_item">{item.start_date_time}</td>
            <td>
              {
                <img
                  src={teamMapping[item.home_team_code].images}
                  alt="Team_logo"
                />
              }{" "}
              {teamMapping[item.home_team_code].type}
            </td>
            <td>
              {
                <img
                  src={teamMapping[item.away_team_code].images}
                  alt="Team_logo"
                />
              }{" "}
              {teamMapping[item.away_team_code].type}
            </td>
            {item.played === true ? (
              <td className="row_item">
                {item.home_team_result} - {item.away_team_result}
              </td>
            ) : (
              <td className="row_item">-</td>
            )}
            {item.played === true ? (
              item.overtime === true ? (
                <td className="row_item">OT</td>
              ) : <td className="row_item"></td> &&
                item.penalty_shots === true ? (
                <td className="row_item">SO</td>
              ) : (
                <td className="row_item"></td>
              )
            ) : (
              <td className="row_item">-</td>
            )}
            <td className="row_item">{item.venue}</td>
            <td className="row_item">{infoMapping[item.game_type]}</td>
          </tr>
        );
      } else {
        return null;
      }
    });
    return (
      <div>
        <StatNavbar />
        <Layout>
          <br />
          <br />
          <Table className="table">
            <tbody>
              <tr class="border_bottom">
                <th className="header_item">datum</th>
                <th>
                  <span className="header_item">Hemma</span>
                </th>
                <th>
                  <span className="header_item">borta</span>
                </th>
                <th className="header_item"></th>
                <th className="header_item"></th>
                <th className="header_item">Arena</th>
              </tr>
            </tbody>
            {game}
          </Table>
        </Layout>
      </div>
    );
  } else {
    return null;
  }
};
