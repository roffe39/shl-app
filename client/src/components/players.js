import React from "react";
import { Layout } from "../components/layout";
import { StatNavbar } from "../components/StatNavbar";
import { PlayersStat } from "../queries/queries";
import { useQuery } from "react-apollo-hooks";
import { Table } from "react-bootstrap";
import teamMapping from "../team-mapping.json";
import posMapping from "../pos_mapping.json";

export const Players = () => {
  const { data } = useQuery(PlayersStat);
  if (data) {
    const standing = data.players.map(item => {
      return (
        <tr className="border_row border_bottom">
          <td className="row_item">{item.rank}</td>
          <td>
            {item.info.first_name} {item.info.last_name}
          </td>
          <td>{item.info.number}</td>
          <td>
            {
              <img
                src={teamMapping[item.info.team_code].images}
                alt="Team_logo"
              />
            }{" "}
            {teamMapping[item.info.team_code].type}
          </td>
          <td className="row_item">{posMapping[item.info.position]}</td>
          <td className="row_item">{item.gp}</td>
          <td className="row_item">{item.g}</td>
          <td className="row_item">{item.a}</td>
          <td className="row_item">{item.tp}</td>
          <td className="row_item">{item.pim}</td>
          <td className="row_item">{item.gwg}</td>
          <td className="row_item">{item.ppg}</td>
          <td className="row_item">{item.sog}</td>
          <td className="row_item">{item.hits}</td>
          <td className="row_item">{item.bk_s}</td>
          <td className="row_item">{item.plus}</td>
          <td className="row_item">{item.minus}</td>
          <td className="row_item">{item.plus_minus}</td>
          <td className="row_item">{item.toi_gp}</td>
          <td className="row_item">{fmtMSS(item.toi)}</td>
        </tr>
      );
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
                <th className="header_item">#</th>
                <th>
                  <span className="header_item">Spelare</span>
                </th>
                <th>
                  <span className="header_item">nr</span>
                </th>
                <th>
                  <span className="header_item">Lag</span>
                </th>
                <th className="header_item">pos</th>
                <th className="header_item">GP</th>
                <th className="header_item">g</th>
                <th className="header_item">a</th>
                <th className="header_item">tp</th>
                <th className="header_item">pim</th>
                <th className="header_item">gwg</th>
                <th className="header_item">ppg</th>
                <th className="header_item">sog</th>
                <th className="header_item">hits</th>
                <th className="header_item">bks</th>
                <th className="header_item">+</th>
                <th className="header_item">-</th>
                <th className="header_item">+/-</th>
                <th className="header_item">toi/gp</th>
                <th className="header_item">toi</th>
              </tr>
            </tbody>
            {standing}
          </Table>
        </Layout>
      </div>
    );
  } else {
    return null;
  }

  function fmtMSS(s){return(s-(s%=60))/60+(9<s?':':':0')+s}
};
