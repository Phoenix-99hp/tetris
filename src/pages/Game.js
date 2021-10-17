import React from "react";
import Layout from "../components/Layout/Layout.jsx";
import Grid from "../components/Grid/Grid.jsx";
import { useTheme } from "styled-components";

const Game = () => {
  const theme = useTheme();
  return (
    <Layout>
      <Grid />
    </Layout>
  );
};

export default Game;
