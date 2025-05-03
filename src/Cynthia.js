import React, { useState, useEffect } from "react";
import ani from "./assets/company/animated.png";
import act from "./assets/company/act.png";
import off from "./assets/company/off.png";

function Cynthia() {
  const [currentImage, setCurrentImage] = useState(act);

  useEffect(() => {
    const loopAnimation = () => {
      const randomDelay = Math.floor(Math.random() * 17000) + 3000;

      setTimeout(() => {
        setCurrentImage(ani);

        setTimeout(() => {
          setCurrentImage(act);
          loopAnimation();
        }, 12000);
      }, randomDelay);
    };

    loopAnimation();

    return () => clearTimeout();
  }, []);

  return (
    <div className="cynthia">
      <img
        src={currentImage}
        alt="Cynthia"
        style={{
          width: "100%",
          height: "100%",
          top: "0",
          left: "0",
        }}
      />
    </div>
  );
}

export default Cynthia;
