import * as React from "react";
import Layout from "../components/Layout";
import Single from "../components/SingleAsset";
import NavBar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
export default function AccountPage(props: any): JSX.Element {
  return (
    <Layout>
      <NavBar />
      <Single />
      <Footer />
    </Layout>
  );
}
