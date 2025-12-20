import React from "react";
import HeroSection from "../components/home/Hero";
import WinnerAdvertisement from "../components/home/WinnerAdvertisement";
import HowItWorks from "../components/home/HowItWorks";
import PopularContest from "../components/home/PopularContest";

export default function Home() {
  return (
    <div className="p-4">
      <HeroSection />
      <PopularContest />
      <WinnerAdvertisement />

      <HowItWorks />
    </div>
  );
}
