import React from "react";
import { Outlet } from "react-router";
import NavBar from "../components/common/NavBar";
import Footer from "../components/common/Footer";

export default function MainLayout() {
  return (
    <div>
      <NavBar />
      <main className="">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
