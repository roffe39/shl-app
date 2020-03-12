import React from "react";
import { Layout } from "../components/layout";
import { StatNavbar } from "../components/StatNavbar";
import { StandingTable } from "../queries/queries";
import { useQuery } from "react-apollo-hooks";
import { Table } from "react-bootstrap";
import teamMapping from "../team-mapping.json";

export const Teams = () => {
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
          <td className="row_item">{item.reg_w + item.non_reg_w}</td>
          <td className="row_item">{item.ott}</td>
          <td className="row_item">{item.non_reg_l + item.reg_l}</td>
          <td className="row_item">{item.g}</td>
          <td className="row_item">{item.ga}</td>
          <td className="row_item">{item.otw}</td>
          <td className="row_item">{item.otl}</td>
          <td className="row_item">{item.sow}</td>
          <td className="row_item">{item.sol}</td>
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
                <th className="header_item">GP</th>
                <th className="header_item">won</th>
                <th className="header_item">tied</th>
                <th className="header_item">lost</th>
                <th className="header_item">G</th>
                <th className="header_item">ga</th>
                <th className="header_item">otw</th>
                <th className="header_item">otl</th>
                <th className="header_item">sow</th>
                <th className="header_item">sol</th>
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
