import React, { useState } from "react";
import { Layout } from "../components/layout";
import { StatNavbar } from "../components/StatNavbar";
import { GoalkeepersStat } from "../queries/queries";
import { useQuery } from "react-apollo-hooks";
import { Table } from "react-bootstrap";
import teamMapping from "../team-mapping.json";

export const Goalkeepers = () => {
  const [option, setOption] = useState("goalsAgainstAverage");

  const handelSelect = e => {
    e.preventDefault();
    setOption(e.target.value);
  };

  const { data } = useQuery(GoalkeepersStat, {
    variables: { name: option }
  });

  if (data) {
    const standing = data.goalkeepers.map(item => {
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
          <td className="row_item">{item.gp}</td>
          <td className="row_item">{item.gpi}</td>
          <td className="row_item">{item.ga}</td>
          {option === "goalsAgainstAverage" ? (
            <td className="row_item table__highlight">{item.gaa.toFixed(2)}</td>
          ) : (
            <td className="row_item">{item.gaa.toFixed(2)}</td>
          )}
          {option === "won" ? (
            <td className="row_item table__highlight">{item.w}</td>
          ) : (
            <td className="row_item">{item.w}</td>
          )}
          <td className="row_item">{item.t}</td>
          <td className="row_item">{item.l}</td>
          <td className="row_item">{item.so}</td>
          {option === "saves" ? (
            <td className="row_item table__highlight">{item.svs}</td>
          ) : (
            <td className="row_item">{item.svs}</td>
          )}
          {option === "savesPercent" ? (
            <td className="row_item table__highlight">
              {item.svsperc.toFixed(2)}
            </td>
          ) : (
            <td className="row_item">{item.svsperc.toFixed(2)}</td>
          )}
          <td className="row_item">{item.mip}</td>
        </tr>
      );
    });
    return (
      <div>
        <StatNavbar />
        <Layout>
          <select
            defaultValue={option}
            onChange={e => handelSelect(e)}
            className="browser-default custom-select"
          >
            <option value="goalsAgainstAverage">Insläppta mål i snitt</option>
            <option value="saves">Räddningar</option>
            <option value="won">Vinster</option>
            <option value="savesPercent">Räddningsprocent</option>
          </select>
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
                <th className="header_item">gp</th>
                <th className="header_item">gpi</th>
                <th className="header_item">ga</th>
                {option === "goalsAgainstAverage" ? (
                  <th className="header_item table__highlight">gaa</th>
                ) : (
                  <th className="header_item">gaa</th>
                )}
                {option === "won" ? (
                  <th className="header_item table__highlight">won</th>
                ) : (
                  <th className="header_item">won</th>
                )}
                <th className="header_item">tied</th>
                <th className="header_item">lost</th>
                <th className="header_item">so</th>
                {option === "saves" ? (
                  <th className="header_item table__highlight">svs</th>
                ) : (
                  <th className="header_item">svs</th>
                )}
                {option === "savesPercent" ? (
                  <th className="header_item table__highlight">svs%</th>
                ) : (
                  <th className="header_item">svs%</th>
                )}
                <th className="header_item">mip</th>
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
