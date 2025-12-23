import React, { Suspense } from "react";
import { Outlet } from "react-router";
import NavBar from "../components/common/NavBar";
import Footer from "../components/common/Footer";
import Loading from "../components/common/Loading";

export default function MainLayout() {
  return (
    <>
      <NavBar />
      <main className=" mt-13 min-h-screen">
        <Suspense
          fallback={
            <div className="h-screen w-full flex justify-center items-center">
              <Loading />
            </div>
          }
        >
          <Outlet />
        </Suspense>

        {/* <Outlet /> */}
      </main>
      <Footer />
    </>
  );
}
