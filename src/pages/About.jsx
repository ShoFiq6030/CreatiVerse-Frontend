import React from "react";
import { Link } from "react-router";
import { useTheme } from "../hooks/useTheme";

export default function About() {
  const { theme } = useTheme();
  const wrapperBg =
    theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800";
  const muted = theme === "dark" ? "text-gray-300" : "text-gray-600";
  const cardBg = theme === "dark" ? "bg-gray-800" : "bg-gray-50";

  const members = [
    {
      name: "Shofiq",
      img: "https://res.cloudinary.com/dfz4ek2ub/image/upload/v1763538823/PH/PH-10/prmqeyxjpiucd3qkcols.jpg",
      role: "admin",
    },
    {
      name: "Shofiq",
      img: "https://res.cloudinary.com/dfz4ek2ub/image/upload/v1763538823/PH/PH-10/prmqeyxjpiucd3qkcols.jpg",
      role: "admin",
    },
    {
      name: "Shofiq",
      img: "https://res.cloudinary.com/dfz4ek2ub/image/upload/v1763538823/PH/PH-10/prmqeyxjpiucd3qkcols.jpg",
      role: "admin",
    },
  ];

  return (
    <div className={`container mx-auto  px-6 py-12 relative top-20 ${wrapperBg}`}>
      <section className="max-w-4xl  mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About Our Contest Platform</h1>
        <p className={`mx-auto max-w-2xl ${muted}`}>
          We connect talented creators with exciting contests that help them
          showcase skills, win prizes, and build reputation. Our platform
          focuses on fairness, creativity, and community.
        </p>
      </section>

      <section className="grid md:grid-cols-3 gap-6 mb-12">
        <div className={`p-6 rounded-lg shadow ${cardBg}`}>
          <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
          <p className={`text-sm ${muted}`}>
            To empower creators by providing accessible, transparent and
            rewarding contests that spotlight talent and foster collaboration.
          </p>
        </div>

        <div className={`p-6 rounded-lg shadow ${cardBg}`}>
          <h3 className="text-xl font-semibold mb-2">How it Works</h3>
          <ul className={`text-sm list-disc pl-5 ${muted}`}>
            <li>Browse contests by category and skill</li>
            <li>Submit your best work before the deadline</li>
            <li>Winners earn prizes and recognition</li>
          </ul>
        </div>

        <div className={`p-6 rounded-lg shadow ${cardBg}`}>
          <h3 className="text-xl font-semibold mb-2">Community</h3>
          <p className={`text-sm ${muted}`}>
            Join a friendly community of creators and reviewers. Participate in
            feedback loops and grow together.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <div
          className={`rounded-lg p-6 flex flex-col md:flex-row items-center gap-6 shadow ${cardBg}`}
        >
          <div className="flex-1">
            <h3 className="text-2xl font-semibold mb-2">
              Ready to explore contests?
            </h3>
            <p className={`mb-4 ${muted}`}>
              Discover trending contests, join with your best submission, and
              start earning rewards.
            </p>
            <Link
              to="/all-contest"
              className="inline-block px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Browse Contests
            </Link>
          </div>
          <div className="w-full md:w-1/3">
            <img
              src="https://images.unsplash.com/photo-1578269174936-2709b6aeb913?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="community"
              className="w-full rounded"
            />
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h3 className="text-2xl font-semibold mb-4">Meet the Team</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {members.map((member,i) => (
            <div key={i} className={`p-6 rounded-lg ${cardBg} shadow`}>
              <div className="flex items-center gap-4">
                {/* <div className="w-16 h-16 rounded-full bg-gray-300" /> */}
                <img src={member.img} alt={`${member.name}-photo`} className="w-16 h-16 rounded-full object-cover " />
                <div>
                  <h4 className="font-semibold">{member.name}</h4>
                  <p className={`text-sm ${muted}`}>{member.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
