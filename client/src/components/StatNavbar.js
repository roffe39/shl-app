import React from 'react';
import { Nav, Navbar } from "react-bootstrap";
import styled from "styled-components";

const Styles = styled.div`
  .navbar {
    background-color: #222;
  }

  .navbar-brand,
  .navbar-nav .nav-link {
    color: #bbb;

    &:hover {
      color: white;
    }
  }
`;

export const StatNavbar = () => {
    return (
        <Styles>
          <Navbar expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="centerStat">
                <Nav.Item>
                  <Nav.Link href="/table">Tabell</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/players">Spelare</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/teams">lag</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/goalkeepers">Målvakter</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/games">Matcher</Nav.Link>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Styles>
      );
}
 