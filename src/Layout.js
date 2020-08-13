import React from "react";
import { Box, Main } from "grommet";
import NavBar from "./blocks/NavBar.js";

const Layout = ({ children }) => {
  return (
    <Box>
      <NavBar />
      <Main>{children}</Main>
    </Box>
  );
};

export default Layout;
