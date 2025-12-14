import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router";

export default function HeroSlider() {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 3000 }}
      pagination={{ clickable: true }}
      loop
      className="h-80 md:h-180"
    >
      <SwiperSlide>
        <div
          className="h-full bg-cover bg-center flex items-center justify-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1689073016656-d8c0b43d4394?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-5xl text-white font-bold">Join Contests</h1>
            <Link to="/all-contest" className="btn w-30 bg-red-400 rounded-full">
              Explore
            </Link>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div
          className="h-full bg-cover bg-center flex items-center justify-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1736240842741-172708c2e596?q=80&w=1113&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-5xl text-white font-bold">Join Contests</h1>
            <Link to="/all-contest" className="btn w-30 bg-red-400 rounded-full">
              Explore
            </Link>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div
          className="h-full bg-cover bg-center flex items-center justify-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1604250165934-78133c454c24?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-5xl text-white font-bold">Join Contests</h1>
            <Link to="/all-contest" className="btn w-30 bg-red-400 rounded-full">
              Explore
            </Link>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
