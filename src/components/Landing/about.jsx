import { useState } from "react";
import aboutImg from "../../assets/about-img.jpg"; // Adjust path if needed

const tabData = [
  {
    id: "profile",
    title: "Our Profile",
    content: [
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
      "There are many variations of passages of Lorem Ipsum available, but the majority have in some form, by injected humour.",
    ],
  },
  {
    id: "vision",
    title: "Our Vision",
    content: [
      "Our vision is to streamline student attendance with modern, secure, and automated solutions built for institutions like BVC.",
      "We aim to reduce manual errors and bring efficiency to student presence tracking.",
    ],
  },
  {
    id: "history",
    title: "Our History",
    content: [
      "Started as a final-year project, this system evolved into a functional prototype exclusively for BVC’s 4th-year students.",
      "Our motivation comes from solving real problems faced in campus administration.",
    ],
  },
];

export default function AboutComponent() {
  const [activeTab, setActiveTab] = useState(tabData[0].id);

  return (
    <section id="about" className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid gap-14 lg:grid-cols-2 items-center">
          {/* Image Side */}
          <div className="max-w-[500px] mx-auto">
            <img
              src={aboutImg}
              alt="About us"
              className="rounded-xl shadow-lg w-full object-cover"
            />
          </div>

          {/* Text & Tabs */}
          <div>
            <h6 className="text-blue-600 font-semibold text-sm uppercase mb-2">About Us</h6>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 leading-snug">
              Our team comes with the experience and knowledge
            </h2>

            {/* Tabs */}
            <div className="my-6 flex flex-wrap gap-3">
              {tabData.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-gray-200 text-gray-700 hover:bg-blue-600 hover:text-white"
                  }`}
                >
                  {tab.title}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="mt-4 space-y-4">
              {tabData.map((tab) =>
                activeTab === tab.id ? (
                  <div key={tab.id}>
                    {tab.content.map((paragraph, index) => (
                      <p
                        key={index}
                        className="text-gray-600 dark:text-gray-300 leading-relaxed"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ) : null
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
