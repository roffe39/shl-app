import React from "react";
import { StandingTable } from "../queries/queries";
import { useQuery } from "react-apollo-hooks";
import { Table } from "react-bootstrap";
import teamMapping from "../team-mapping.json";
import { Layout } from "../components/layout";
import { StatNavbar } from "../components/StatNavbar";

export const SHLstanding = () => {
  const { data } = useQuery(StandingTable);
  if (data) {
    const standing = data.standing.map(item => {
      return (
        <tr className="border_row border_bottom">
          <td className="row_item">{item.rank}</td>
          <td>
            {<img src={teamMapping[item.team_code].images} alt="Team_logo" />}{" "}
            {teamMapping[item.team_code].type}
          </td>
          <td className="row_item">{item.gp}</td>
          <td className="row_item">{item.reg_w}</td>
          <td className="row_item">{item.non_reg_w}</td>
          <td className="row_item">{item.non_reg_l}</td>
          <td className="row_item">{item.reg_l}</td>
          <td className="row_item">{item.g}</td>
          <td className="row_item">{item.ga}</td>
          <td className="row_item">{item.diff}</td>
          <td className="row_item">{item.points}</td>
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
                  <span className="header_item">Lag</span>
                </th>
                <th title="Spelade matcher" className="header_item">
                  GP
                </th>
                <th
                  title="3 Poäng: Vinster efter ordinarie tid"
                  className="header_item"
                >
                  3P
                </th>
                <th
                  title="2 Poäng: Vinster efter förlängning eller straffar"
                  className="header_item"
                >
                  2P
                </th>
                <th
                  title="1 Poäng: Förluster efter förlängning eller straffar, eller oavgjorda matcher"
                  className="header_item"
                >
                  1P
                </th>
                <th
                  title="0 Poäng: Förluster efter ordinarie tid"
                  className="header_item"
                >
                  0P
                </th>
                <th title="Mål" className="header_item">
                  G
                </th>
                <th title="Insläppta mål" className="header_item">
                  GA
                </th>
                <th title="+/-" className="header_item">
                  +/-
                </th>
                <th title="Poäng" className="header_item">
                  Points
                </th>
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
};
