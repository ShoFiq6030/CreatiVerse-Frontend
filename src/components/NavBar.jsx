import { Link } from "react-router";

export default function NavBar() {
  return (
    <nav className="bg-base-200 p-4 mb-4">
      <ul className="flex gap-4">
        <li>
          <Link to="/" className="hover:underline">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className="hover:underline">
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
}
