import { Link, NavLink } from "react-router";
import ThemeToggle from "./ThemeToggle";
import logo from "../../assets/logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiCloseLargeLine } from "react-icons/ri";
import { useState } from "react";
import { useTheme } from "../../hooks/useTheme";

export default function NavBar() {
  const [openMenu, setOpenMenu] = useState(false);
  const user = false;
  const { theme } = useTheme();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "All Contest", path: "/all-contest" },
    { name: "Leaderboard", path: "/leaderboard" },
    { name: "About", path: "/about" },

    // show ONLY when NOT logged in
    { name: "Login", path: "/login", authOnly: true },
    { name: "Register", path: "/register", authOnly: true },
    // show ONLY when logged in
    { name: "My Properties", path: "/my-properties", private: true },
    { name: "My Ratings", path: "/my-ratings", private: true },
  ];
  const handleMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="md:flex-1">
        <Link>
          <img src={logo} alt="logo" className="w-24" />
        </Link>
      </div>
      {/* desktop menu  */}
      <div className="hidden md:block">
        <div className=" flex items-center gap-4">
          {navItems.map((item, i) => {
            if (item.authOnly && user) return null;
            if (item.private && !user) return null;
            return (
              <NavLink
                key={i}
                to={item.path}
                className={({ isActive }) =>
                  `hover:text-red-600 font-semibold text-lg transition   ${
                    item.name === "Login" || item.name === "Register"
                      ? "btn"
                      : ""
                  } ${isActive ? "text-red-500" : ""}`
                }
              >
                {item.name}
              </NavLink>
            );
          })}
        </div>
      </div>
      {/* mobile menu  */}
      <div className="  md:hidden flex w-screen ">
        {openMenu && (
          <div
            className={` absolute top-16 left-0 w-full py-4   ${
              theme === "light" ? "bg-gray-300/80" : "bg-gray-600/80"
            } flex flex-col items-center justify-center gap-4  `}
          >
            {navItems.map((item, i) => {
              if (item.authOnly && user) return null;
              if (item.private && !user) return null;
              return (
                <NavLink
                  key={i}
                  to={item.path}
                  className={({ isActive }) =>
                    `hover:text-red-600 font-semibold text-lg transition   ${
                      item.name === "Login" || item.name === "Register"
                        ? "btn"
                        : ""
                    } ${isActive ? "text-red-500" : ""}`
                  }
                >
                  {item.name}
                </NavLink>
              );
            })}
          </div>
        )}
      </div>

      <div className="flex">
        <div className="dropdown dropdown-end px-5">
          <ThemeToggle />
        </div>

        {user && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">Profile</a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        )}
        <div className="md:hidden" onClick={handleMenu}>
          {openMenu ? (
            <RiCloseLargeLine size={32} />
          ) : (
            <GiHamburgerMenu size={32} />
          )}
        </div>
      </div>
    </div>
  );
}
