import { Link, NavLink } from "react-router";
import ThemeToggle from "./ThemeToggle";
import logo from "../../assets/logo.png";

export default function NavBar() {
  const user = false;
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

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link>
          <img src={logo} alt="logo" className="w-24" />
        </Link>
      </div>
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
                  item.name === "Login" || item.name === "Register" ? "btn" : ""
                } ${isActive ? "text-red-500" : ""}`
              }
            >
              {item.name}
            </NavLink>
          );
        })}
      </div>

      <div className="flex-none">
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
      </div>
    </div>
  );
}
