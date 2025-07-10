import React from "react";
import { Container } from "reactstrap";
import Header from "../Header";
import Footer from "../Footer";

export default function Layout({ children }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <Container className="flex-fill">
        {children}
      </Container>

      <Footer />
    </div>
  );
}
