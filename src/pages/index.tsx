import * as React from "react";
import Layout from "../components/Layout";
import LandPage from "../components/LandPage";
import NavBar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
export default function IndexPage(props: any): JSX.Element {
  return (
    <Layout>
      <NavBar />
      <LandPage />
      <Footer />
    </Layout>
  );
}
