import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import "../styles/Home.css";

const therapies = [
  {
    title: "Agni Karma",
    description:
      "Agni Karma is a therapeutic procedure in Ayurveda that uses heat for treating pain, musculoskeletal disorders, and chronic ailments.",
    video: "/Agni.mp4",
  },
  {
    title: "Viddha Karma",
    description:
      "Viddha Karma is an ancient Ayurvedic treatment where a needle is used to relieve pain, improve blood circulation, and balance energy.",
    image: "/Viddha.jpeg",
  },
  {
    title: "Jalaukavacharana (Leech Therapy)",
    description:
      "Leech therapy is a purification technique in Ayurveda where medicinal leeches are used to remove toxins from the blood.",
    video: "/Leech.mp4",
  },
  {
    title: "Raktamokshana",
    description:
      "Raktamokshana is a bloodletting therapy used to detoxify the blood and treat skin diseases, hypertension, and other disorders.",
    video: "/raktamokshana.mp4",
  },
];

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [shrinkTitle, setShrinkTitle] = useState(false);
  const [hideTitle, setHideTitle] = useState(false);
  const [hideCards, setHideCards] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 300);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 100) {
        setHideTitle(true); // Hide title when scrolled beyond 200px
      } else {
        setHideTitle(false); // Show title when near top
      }

      if (scrollY > 50) {
        setShrinkTitle(true); // Start shrinking when scrolling beyond 50px
      } else {
        setShrinkTitle(false); // Reset when at top
      }
      if (scrollY > 100) {
        setHideCards(false); // Show cards when scrolling down
      } else {
        setHideCards(true); // Hide cards when at the top
      }

      // Animate therapy cards on scroll
      const elements = document.querySelectorAll(".therapy-card");
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          el.classList.add("visible");
        } else {
          el.classList.remove("visible");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="container mt-4">
      {/* EVARA Title */}
      <h1
        className={`evara-title ${shrinkTitle ? "shrink" : ""} ${
          hideTitle ? "hidden" : ""
        }`}
      >
        Welcome to EVARA
      </h1>

      <div className={`therapy-container ${hideCards ? "hidden" : "visible"}`}>
        {therapies.map((therapy, index) => (
          <div
            key={index}
            className={`therapy-card ${index % 2 === 0 ? "left" : "right"} ${
              hideCards ? "hidden" : "visible"
            }`}
          >
            {therapy.video ? (
              <video
                src={therapy.video}
                className="therapy-media"
                autoPlay
                loop
                muted
                playsInline
              />
            ) : (
              <img
                src={therapy.image}
                alt={therapy.title}
                className="therapy-media"
              />
            )}
            <div className="therapy-text">
              <h3 style={{ color: "#5c4033" }}>{therapy.title}</h3>
              <p style={{ color: "#5c4033" }}>{therapy.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
