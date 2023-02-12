import Header from "../components/Header";
import Planets from "../components/Planets";

import { useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";

const Home = () => {
  const child = useRef();

  const earthTexts = {
    planetName: "EARTH",
    planetAbout:
      "Learn more about the planet that we call our home, understand it's true beauty and find out what makes it unique.",
  };
  const venusTexts = {
    planetName: "VENUS",
    planetAbout:
      "Learn more about Earth's twin sister Venus, the brightest object in the night sky, and it's dense atmosphere.",
  };
  const mercuryTexts = {
    planetName: "MERCURY",
    planetAbout:
      "Learn more about this crater filled planet called Mercury, the closet planet to the Sun, and the smallest.",
  };
  const marsTexts = {
    planetName: "MARS",
    planetAbout:
      "Learn more about this beautiful desert like planet, it's importance for the future and human expedition missions.",
  };

  const [planetTexts, setPlanetTexts] = useState(earthTexts);
  const [textStateID, setTextStateID] = useState(0);

  const textStates = [earthTexts, marsTexts, venusTexts, mercuryTexts];

  const rotateLeftHandler = () => {
    var id = textStateID;
    id -= 1;
    if (id < 0) {
      id = textStates.length - 1;
    }
    setTextStateID(id);
    setPlanetTexts(textStates[id]);
  };

  const rotateRightHandler = () => {
    var id = textStateID;
    id += 1;
    if (id > textStates.length - 1) {
      id = 0;
    }
    setTextStateID(id);
    setPlanetTexts(textStates[id]);
  };

  const resetHandler = () => {
    setTextStateID(0);
    setPlanetTexts(textStates[0]);
  };

  // Parallax
  useEffect(() => {
    const random = (min, max) => {
      return Math.random() * (max - min + 1) + min;
    };

    const makeStars = () => {
      let starBox = document.querySelector(".stars");

      let brightStars = document.querySelector(".bright");
      let midStars = document.querySelector(".mid");
      let dimStars = document.querySelector(".dim");

      let width = starBox.offsetWidth;
      let height = starBox.offsetHeight;

      let starCount = (width * height) / 100000; // Star density

      // Bright stars

      for (let i = 0; i < starCount; i++) {
        let star = document.createElement("div");

        let size = random(1.5, 2);
        let alpha = random(0.8, 1);
        let posX = random(0, 100);
        let posY = random(0, 100);
        let color = "white";

        star.style.backgroundColor = color;
        star.style.position = "absolute";
        star.style.width = size + "px";
        star.style.height = size + "px";
        star.style.opacity = alpha;
        star.style.top = posX + "%";
        star.style.left = posY + "%";

        brightStars.appendChild(star);
      }

      // Mid stars

      for (let i = 0; i < starCount; i++) {
        let star = document.createElement("div");

        let size = random(0.8, 1.2);
        let alpha = random(0.4, 0.7);
        let posX = random(0, 100);
        let posY = random(0, 100);
        let color = "white";

        star.style.backgroundColor = color;
        star.style.position = "absolute";
        star.style.width = size + "px";
        star.style.height = size + "px";
        star.style.opacity = alpha;
        star.style.top = posX + "%";
        star.style.left = posY + "%";

        midStars.appendChild(star);
      }

      // Dim stars

      for (let i = 0; i < starCount; i++) {
        let star = document.createElement("div");

        let size = random(0.3, 0.5);
        let alpha = random(0.2, 0.4);
        let posX = random(0, 100);
        let posY = random(0, 100);
        let color = "white";

        star.style.backgroundColor = color;
        star.style.position = "absolute";
        star.style.width = size + "px";
        star.style.height = size + "px";
        star.style.opacity = alpha;
        star.style.top = posX + "%";
        star.style.left = posY + "%";

        dimStars.appendChild(star);
      }
    };

    makeStars();
  }, []);

  useEffect(() => {
    const moveStars = (ev) => {
      const bright = document.querySelector(".bright");
      const mid = document.querySelector(".mid");
      const dim = document.querySelector(".dim");
      const planet = document.getElementById("active-planet");

      let x = ev.clientX;
      let y = ev.clientY;

      bright.style.left = x / 800 + "rem";
      mid.style.left = x / 1200 + "rem";
      dim.style.left = x / 1600 + "rem";

      bright.style.top = y / 800 + "rem";
      mid.style.top = y / 1200 + "rem";
      dim.style.top = y / 1600 + "rem";
    };

    window.addEventListener("mousemove", moveStars);

    return () => {
      window.removeEventListener("mousemove", moveStars);
    };
  }, []);

  return (
    <div className="page-container">
      <Header />
      <section className="home-screen"></section>
      <div className="stars">
        <div className="bright"></div>
        <div className="mid"></div>
        <div className="dim"></div>
      </div>
      <div className="planet-text">
        <h2>PLANET</h2>
        <h1 className="planet-name">{planetTexts.planetName}</h1>
        <div className="title-underline" />
        <p className="planet-about">{planetTexts.planetAbout}</p>
      </div>
      <div className="planet-scene">
        <div className="flex-rotate">
          <div
            className="left-rotate"
            onClick={() => {
              child.current.rotateLeft();
              rotateLeftHandler();
            }}
          />
          <div
            className="mid-focus"
            onClick={() => {
              child.current.cameraFocus();
            }}
            onDoubleClick={() => {
              child.current.cameraBlur();
              child.current.resetRotation();
              resetHandler();
            }}
          />
          <div
            className="right-rotate"
            onClick={() => {
              child.current.rotateRight();
              rotateRightHandler();
            }}
          />
        </div>

        <Canvas
          id="active-planet"
          camera={{ position: [40, 7, 0] }}
          style={{ pointerEvents: "none", position: "absolute" }}
        >
          <ambientLight intensity={0.05} />
          <pointLight position={[30, 10, 5]} />
          <Planets ref={child} />
        </Canvas>
      </div>
      <section className="planet-content">
        <h1></h1>
      </section>
    </div>
  );
};

export default Home;
