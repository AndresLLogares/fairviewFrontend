import * as React from "react";
import Layout from "../components/Layout";
import LandPage from "../components/LandPage";

export default function IndexPage(props: any): JSX.Element {
  return (
    <Layout>
      <LandPage />
    </Layout>
  );
}
