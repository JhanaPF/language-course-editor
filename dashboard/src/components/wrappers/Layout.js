import React from "react";
import { Container } from "reactstrap";
import Header from "../Header";
import Footer from "../Footer";
import { Outlet } from "react-router-dom";


export default function Layout() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />

            <Container className="flex-fill">
                <Outlet />
            </Container>

            <Footer />
        </div>
    );
}
