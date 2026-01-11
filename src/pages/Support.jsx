import React, { useState } from "react";
import {
  MdEmail,
  MdPhone,
  MdHelp,
  MdChat,
  MdSecurity,
  MdAccessTime,
  MdGroup,
  MdVerified,
} from "react-icons/md";
import { useTheme } from "../hooks/useTheme";

const Support = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    category: "general",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const supportCategories = [
    { value: "general", label: "General Inquiry" },
    { value: "technical", label: "Technical Issue" },
    { value: "payment", label: "Payment/Billing" },
    { value: "contest", label: "Contest Related" },
    { value: "account", label: "Account Management" },
    { value: "partnership", label: "Partnership/Business" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        category: "general",
      });
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const faqData = [
    {
      question: "How do I participate in a contest?",
      answer:
        "To participate in a contest, you need to create an account, browse available contests, and submit your entry according to the contest guidelines. Make sure to review the rules and submission requirements before participating.",
    },
    {
      question: "When will I receive my prize if I win?",
      answer:
        "Prize payments are typically processed within 5-7 business days after the contest results are announced. You'll receive an email notification with payment details and instructions.",
    },
    {
      question: "Can I edit my submission after submitting?",
      answer:
        "Once a submission is made, it cannot be edited. However, you can contact our support team if you need to make changes before the submission deadline.",
    },
    {
      question: "How are winners selected?",
      answer:
        "Winners are selected based on the criteria specified in each contest. This may include community voting, judge evaluation, or a combination of both. The selection process is transparent and fair.",
    },
  ];

  // Theme-based styling classes
  const getBgGradient = () => {
    return theme === 'dark' 
      ? 'bg-gradient-to-br from-slate-900 to-slate-800'
      : 'bg-gradient-to-br from-slate-50 to-slate-100';
  };

  const getTextColor = () => {
    return theme === 'dark' ? 'text-white' : 'text-slate-900';
  };

  const getSecondaryTextColor = () => {
    return theme === 'dark' ? 'text-slate-300' : 'text-slate-600';
  };

  const getBorderColor = () => {
    return theme === 'dark' ? 'border-slate-700' : 'border-slate-200';
  };

  const getBgCard = () => {
    return theme === 'dark' ? 'bg-slate-800' : 'bg-white';
  };

  const getBgInput = () => {
    return theme === 'dark' ? 'bg-slate-700' : 'bg-white';
  };

  const getBorderInput = () => {
    return theme === 'dark' ? 'border-slate-600' : 'border-slate-300';
  };

  const getHoverBorder = () => {
    return theme === 'dark' ? 'group-hover:border-slate-500' : 'group-hover:border-slate-400';
  };

  const getSuccessBg = () => {
    return theme === 'dark' ? 'bg-green-900/20' : 'bg-green-50';
  };

  const getSuccessBorder = () => {
    return theme === 'dark' ? 'border-green-800' : 'border-green-200';
  };

  const getSuccessText = () => {
    return theme === 'dark' ? 'text-green-400' : 'text-green-700';
  };

  const getErrorBg = () => {
    return theme === 'dark' ? 'bg-red-900/20' : 'bg-red-50';
  };

  const getErrorBorder = () => {
    return theme === 'dark' ? 'border-red-800' : 'border-red-200';
  };

  const getErrorText = () => {
    return theme === 'dark' ? 'text-red-400' : 'text-red-700';
  };

  const getFaqBg = () => {
    return theme === 'dark' ? 'bg-slate-700' : 'bg-slate-50';
  };

  const getSupportBg = () => {
    return theme === 'dark' ? 'bg-slate-800' : 'bg-white';
  };

  return (
    <div className={`min-h-screen ${getBgGradient()}`}>
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className={`text-4xl md:text-6xl font-bold ${getTextColor()} mb-6`}>
            We're Here to Help
          </h1>
          <p className={`text-lg md:text-xl ${getSecondaryTextColor()} max-w-3xl mx-auto`}>
            Whether you have questions about contests, need technical
            assistance, or want to learn more about our platform, our dedicated
            support team is ready to assist you.
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className={`${getBgCard()} rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border ${getBorderColor()}`}>
              <div className="flex items-center justify-center w-16 h-16 bg-blue-50 dark:bg-blue-950 rounded-full mb-6 border-2 border-blue-100 dark:border-blue-800">
                <MdEmail className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className={`text-xl font-semibold ${getTextColor()} mb-4`}>
                Email Support
              </h3>
              <p className={`${getSecondaryTextColor()} mb-4`}>
                Get in touch with our support team via email. We typically
                respond within 24 hours.
              </p>
              <a
                href="mailto:support@creativeverse.com"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium inline-flex items-center gap-2"
              >
                <MdEmail className="w-5 h-5" />
                support@creativeverse.com
              </a>
            </div>

            <div className={`${getBgCard()} rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border ${getBorderColor()}`}>
              <div className="flex items-center justify-center w-16 h-16 bg-green-50 dark:bg-green-950 rounded-full mb-6 border-2 border-green-100 dark:border-green-800">
                <MdChat className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className={`text-xl font-semibold ${getTextColor()} mb-4`}>
                Live Chat
              </h3>
              <p className={`${getSecondaryTextColor()} mb-4`}>
                Connect with our support team in real-time. Available Monday
                through Friday, 9 AM - 6 PM EST.
              </p>
              <button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                <span className="flex items-center gap-2">
                  <MdChat className="w-5 h-5" />
                  Start Chat
                </span>
              </button>
            </div>

            <div className={`${getBgCard()} rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border ${getBorderColor()}`}>
              <div className="flex items-center justify-center w-16 h-16 bg-purple-50 dark:bg-purple-950 rounded-full mb-6 border-2 border-purple-100 dark:border-purple-800">
                <MdPhone className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className={`text-xl font-semibold ${getTextColor()} mb-4`}>
                Phone Support
              </h3>
              <p className={`${getSecondaryTextColor()} mb-4`}>
                Speak directly with our support specialists. We're here to help
                you with any questions.
              </p>
              <a
                href="tel:+1-555-123-4567"
                className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-medium inline-flex items-center gap-2"
              >
                <MdPhone className="w-5 h-5" />
                +1 (555) 123-4567
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`${getBgCard()} rounded-2xl shadow-xl p-8 md:p-12`}>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className={`text-3xl font-bold ${getTextColor()} mb-4`}>
                  Send Us a Message
                </h2>
                <p className={`${getSecondaryTextColor()}`}>
                  Fill out the form below and we'll get back to you as soon as
                  possible.
                </p>
              </div>

              {submitStatus === "success" && (
                <div className={`${getSuccessBg()} border ${getSuccessBorder()} ${getSuccessText()} px-4 py-3 rounded mb-6 flex items-center gap-3 shadow-md`}>
                  <span className={theme === 'dark' ? 'text-green-400' : 'text-green-500'}>
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </span>
                  Thank you for your message! We'll get back to you soon.
                </div>
              )}

              {submitStatus === "error" && (
                <div className={`${getErrorBg()} border ${getErrorBorder()} ${getErrorText()} px-4 py-3 rounded mb-6 flex items-center gap-3 shadow-md`}>
                  <span className={theme === 'dark' ? 'text-red-400' : 'text-red-500'}>
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </span>
                  Sorry, there was an error sending your message. Please try
                  again.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label
                      htmlFor="name"
                      className={`block text-sm font-medium ${getSecondaryTextColor()} mb-2`}
                    >
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-3 pl-12 border ${getBorderInput()} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${getBgInput()} ${getTextColor()} transition-all duration-300 ${getHoverBorder()}`}
                        placeholder="Enter your full name"
                      />
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div className="group">
                    <label
                      htmlFor="email"
                      className={`block text-sm font-medium ${getSecondaryTextColor()} mb-2`}
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-3 pl-12 border ${getBorderInput()} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${getBgInput()} ${getTextColor()} transition-all duration-300 ${getHoverBorder()}`}
                        placeholder="Enter your email address"
                      />
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500">
                        <MdEmail className="w-5 h-5" />
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label
                      htmlFor="category"
                      className={`block text-sm font-medium ${getSecondaryTextColor()} mb-2`}
                    >
                      Category
                    </label>
                    <div className="relative">
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 pl-12 border ${getBorderInput()} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${getBgInput()} ${getTextColor()} transition-all duration-300 ${getHoverBorder()}`}
                      >
                        {supportCategories.map((category) => (
                          <option key={category.value} value={category.value}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div className="group">
                    <label
                      htmlFor="subject"
                      className={`block text-sm font-medium ${getSecondaryTextColor()} mb-2`}
                    >
                      Subject
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-3 pl-12 border ${getBorderInput()} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${getBgInput()} ${getTextColor()} transition-all duration-300 ${getHoverBorder()}`}
                        placeholder="Brief description of your issue"
                      />
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <label
                    htmlFor="message"
                    className={`block text-sm font-medium ${getSecondaryTextColor()} mb-2`}
                  >
                    Message
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className={`w-full px-4 py-3 pl-12 border ${getBorderInput()} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${getBgInput()} ${getTextColor()} transition-all duration-300 resize-none ${getHoverBorder()}`}
                      placeholder="Please describe your issue or question in detail"
                    />
                    <span className="absolute left-3 top-4 text-slate-400 dark:text-slate-500">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-blue-400 disabled:to-blue-500 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg hover:shadow-xl"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <span className="flex items-center gap-2">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          />
                        </svg>
                        Send Message
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 ${getSupportBg()}`}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold ${getTextColor()} mb-4`}>
              Frequently Asked Questions
            </h2>
            <p className={`${getSecondaryTextColor()}`}>
              Find answers to common questions about our platform and services.
            </p>
          </div>

          <div className="space-y-6">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className={`${getFaqBg()} rounded-lg p-6`}
              >
                <h3 className={`text-lg font-semibold ${getTextColor()} mb-3 flex items-center`}>
                  <MdHelp className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3" />
                  {faq.question}
                </h3>
                <p className={`${getSecondaryTextColor()}`}>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <a
              href="#"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
            >
              View All FAQs →
            </a>
          </div>
        </div>
      </section>

      {/* Support Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-3xl font-bold ${getTextColor()} mb-4`}>
              Our Support Promise
            </h2>
            <p className={`${getSecondaryTextColor()}`}>
              We're committed to providing you with the best possible
              experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="flex items-center justify-center w-16 h-16 bg-yellow-50 dark:bg-yellow-950 rounded-full mx-auto mb-4 border-2 border-yellow-100 dark:border-yellow-800 group-hover:bg-yellow-100 dark:group-hover:bg-yellow-900 transition-all duration-300">
                <MdAccessTime className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className={`text-lg font-semibold ${getTextColor()} mb-2 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors duration-300`}>
                Fast Response
              </h3>
              <p className={`${getSecondaryTextColor()} text-sm`}>
                We respond to all inquiries within 24 hours.
              </p>
            </div>

            <div className="text-center group">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-50 dark:bg-blue-950 rounded-full mx-auto mb-4 border-2 border-blue-100 dark:border-blue-800 group-hover:bg-blue-100 dark:group-hover:bg-blue-900 transition-all duration-300">
                <MdSecurity className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className={`text-lg font-semibold ${getTextColor()} mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300`}>
                Secure & Private
              </h3>
              <p className={`${getSecondaryTextColor()} text-sm`}>
                Your information is always protected and confidential.
              </p>
            </div>

            <div className="text-center group">
              <div className="flex items-center justify-center w-16 h-16 bg-green-50 dark:bg-green-950 rounded-full mx-auto mb-4 border-2 border-green-100 dark:border-green-800 group-hover:bg-green-100 dark:group-hover:bg-green-900 transition-all duration-300">
                <MdGroup className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className={`text-lg font-semibold ${getTextColor()} mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300`}>
                Expert Team
              </h3>
              <p className={`${getSecondaryTextColor()} text-sm`}>
                Our support team consists of industry experts.
              </p>
            </div>

            <div className="text-center group">
              <div className="flex items-center justify-center w-16 h-16 bg-purple-50 dark:bg-purple-950 rounded-full mx-auto mb-4 border-2 border-purple-100 dark:border-purple-800 group-hover:bg-purple-100 dark:group-hover:bg-purple-900 transition-all duration-300">
                <MdVerified className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className={`text-lg font-semibold ${getTextColor()} mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300`}>
                Quality Guaranteed
              </h3>
              <p className={`${getSecondaryTextColor()} text-sm`}>
                We're committed to resolving your issues completely.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Support;
