import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaPinterestP,
  FaRss,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaFax,
} from "react-icons/fa";
import { useTheme } from "../../hooks/useTheme";
import logo from "./../../assets/logo.png";
import { Link } from "react-router";

export default function Footer() {
  const { theme } = useTheme();
  return (
    <footer
      className={`${theme === "dark" ? " text-neutral-content" : ""}`}
    >
      <div className="container mx-auto px-6 py-16 flex justify-between gap-10">
        {/* About Company */}
        <div className="w-1/2">
          <Link>
            <img src={logo} alt="logo" className="w-24" />
          </Link>
          {/* <h3 className="text-xl font-semibold mb-4">About Company</h3> */}
          <p
            className={`text-sm leading-relaxed  ${
              theme === "dark" ? "text-neutral-content/80" : ""
            }`}
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum
            repellat, maxime vel alias impedit veritatis temporibus, sequi quos
            veniam eius optio corporis modi dicta molestias at inventore culpa,
            natus explicabo.
          </p>

          {/* Social Icons */}
          <div className="flex gap-3 mt-6">
            {[FaFacebookF, FaTwitter, FaRss, FaPinterestP, FaLinkedinIn].map(
              (Icon, i) => (
                <span
                  key={i}
                  className="w-9 h-9 border border-red-500 rounded-full flex items-center justify-center hover:bg-red-500 transition"
                >
                  <Icon className="text-sm" />
                </span>
              )
            )}
          </div>
        </div>

        {/* Corporate Office */}
        <div className="w-1/2 ">
          <h3 className="text-xl font-semibold mb-4">Corporate Office</h3>

          <ul
            className={`space-y-4 ${
              theme === "dark" ? " text-neutral-content/80" : ""
            } text-sm `}
          >
            <li className="flex gap-3">
              <FaMapMarkerAlt className="text-red-500 mt-1" />
              44 New Design Street, rne 00 USA
            </li>

            <li className="flex gap-3">
              <FaPhoneAlt className="text-red-500 mt-1" />
              +985-2356-14566
            </li>

            <li className="flex gap-3">
              <FaEnvelope className="text-red-500 mt-1" />
              yourmail@gmail.com
            </li>

            <li className="flex gap-3">
              <FaFax className="text-red-500 mt-1" />
              Fax: (123) 4589761
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className={`border-t border-neutral-content/50 py-4 text-center ${
          theme === "dark" ? "bg-neutral text-neutral-content" : ""
        } text-sm `}
      >
        © Copyrights 2018. All rights reserved.
      </div>
    </footer>
  );
}
