import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import styled from "styled-components";
import shlLogo from "../Images/shl.png";

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

export const NavigationBar = () => {
  return (
    <Styles>
      <Navbar expand="lg">
        <Navbar.Brand href="/">
          <img
            className="size"
            src={shlLogo}
            alt="No team flag"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="center">
            <Nav.Item>
              <Nav.Link href="/">Gå På Match</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/statistic">Statistik</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/">Spelschema</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/">Lagen</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/">Play</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/">Nyhetsarkiv</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Styles>
  );
};
