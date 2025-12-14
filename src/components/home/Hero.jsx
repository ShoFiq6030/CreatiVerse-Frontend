import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import HeroSlider from "./HeroSlider";

export default function HeroSection() {
  return (
    <div>
      <HeroSlider />
    </div>
  );
}
