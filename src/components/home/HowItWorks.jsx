import React from "react";
import { FaTrophy, FaRocket, FaLightbulb, FaCheckCircle } from "react-icons/fa";
import { useTheme } from "../../hooks/useTheme";
import { Link } from "react-router";

export default function HowItWorks() {
  const { theme } = useTheme();

  const sectionBg =
    theme === "dark"
      ? "bg-linear-to-r from-gray-900 via-gray-800 to-gray-900"
      : "bg-linear-to-r from-purple-50 via-pink-50 to-red-50";

  const cardBg =
    theme === "dark" ? "bg-linear-to-r from-gray-800 to-gray-900" : "bg-white";

  const textColor = theme === "dark" ? "text-white" : "text-gray-800";
  const mutedText = theme === "dark" ? "text-gray-300" : "text-gray-600";

  const steps = [
    {
      icon: <FaLightbulb className="text-4xl text-yellow-500" />,
      title: "Find Your Contest",
      description:
        "Browse through our diverse categories or use our smart search to find contests that match your skills and interests.",
      color: "from-yellow-400 to-orange-500",
    },
    {
      icon: <FaRocket className="text-4xl text-blue-500" />,
      description:
        "Submit your best work following the contest guidelines. Whether it's design, writing, coding, or any other creative field - make it shine!",
      title: "Create & Submit",
      color: "from-blue-400 to-purple-500",
    },
    {
      icon: <FaCheckCircle className="text-4xl text-green-500" />,
      title: "Get Judged Fairly",
      description:
        "Our transparent judging system ensures every submission is evaluated fairly based on clear criteria and community feedback.",
      color: "from-green-400 to-emerald-500",
    },
    {
      icon: <FaTrophy className="text-4xl text-purple-500" />,
      title: "Win & Celebrate",
      description:
        "Win amazing prizes, gain recognition, and see your work featured in our winners gallery. Your journey to success starts here!",
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <section className={`py-16 ${sectionBg} relative overflow-hidden`}>
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-500/10 rounded-full"></div>
        <div className="absolute top-20 right-10 w-80 h-80 bg-pink-500/10 rounded-full"></div>
        <div className="absolute bottom-10 left-1/3 w-72 h-72 bg-red-500/10 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className={`text-4xl md:text-5xl font-bold ${textColor} mb-4`}>
            How It Works
          </h2>
          <p className={`text-lg md:text-xl ${mutedText} max-w-3xl mx-auto`}>
            Join our creative community and turn your talent into rewards. It's
            simple, fun, and packed with opportunities!
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`rounded-2xl p-8 ${cardBg} shadow-xl relative overflow-hidden ${textColor} hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2`}
            >
              {/* Decorative gradient border */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-linear-to-r ${step.color}`}
              ></div>

              {/* Step number */}
              <div
                className={`absolute top-6 right-6 w-10 h-10 rounded-full ${
                  theme === "dark" ? "bg-gray-700" : "bg-purple-100"
                } flex items-center justify-center text-sm font-bold ${
                  theme === "dark" ? "text-gray-300" : "text-purple-600"
                }`}
              >
                0{index + 1}
              </div>

              {/* Icon */}
              <div className="mb-6 flex justify-center">
                <div
                  className={`p-4 rounded-2xl bg-linear-to-r ${step.color} text-white shadow-lg`}
                >
                  {step.icon}
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-center">{step.title}</h3>
                <p className={`text-center ${mutedText} leading-relaxed`}>
                  {step.description}
                </p>
              </div>

              {/* Decorative corner */}
              <div
                className={`absolute bottom-0 right-0 w-24 h-24 ${
                  theme === "dark" ? "bg-gray-700/30" : "bg-purple-100/50"
                } rounded-tl-2xl`}
              ></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className={`mt-12 text-center ${textColor}`}>
          <div className={`inline-block rounded-2xl p-8 ${cardBg} shadow-xl`}>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className={`text-lg ${mutedText} mb-6 max-w-2xl mx-auto`}>
              Thousands of creators are already winning amazing prizes. What are
              you waiting for? Your next big opportunity is just a click away!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/all-contest"
                className="bg-linear-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transform hover:-translate-y-1 transition duration-300"
              >
                Browse Contests
              </Link>
              {/* <button className={`px-8 py-4 rounded-lg font-semibold text-lg border ${theme === 'dark' ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'} transition duration-300`}>
                Learn More
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
