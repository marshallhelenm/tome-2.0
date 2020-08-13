import React from "react";
import { Button, Header, Menu, Heading } from "grommet";
import {Home} from "grommet-icons";

const NavBar = () => {
  return (
    <Header>
      <Button icon={<Home />} hoverIndicator href="https://wbtome.herokuapp.com/" />
      <Heading level="3">The World Builder's Tome</Heading>
      <Menu label="account" items={[{ label: "logout" }]} />
    </Header>
  );
};

export default NavBar;
