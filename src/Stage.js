import React, { useState, useEffect } from "react";
import Script from "./Scripts";
import "./Stage.css";
import scriptData from "./scriptData";

function Stage({ initialId }) {
  const [currentId, setCurrentId] = useState(initialId);
  const [showSplash, setShowSplash] = useState(false);
  const [splashText, setSplashText] = useState("");

  useEffect(() => {
    const splashIds = [1, 2, 3, 4, 5];
    if (splashIds.includes(initialId)) {
      const line = scriptData.find((line) => line.id === initialId);
      setSplashText(line?.text || "");
      setShowSplash(true);

      const autoChoice = line?.choices?.find((choice) => choice.text === "o");
      const nextId = autoChoice?.nextId;

      if (nextId) {
        setTimeout(() => {
          setCurrentId(nextId);
          setShowSplash(false);
        }, 2000);
      }
    }
  }, [initialId]);

  return (
    <>
      {showSplash ? (
        <div className="intro">
          <p className="splash-text">{splashText}</p>
        </div>
      ) : (
        <div className="script-stage">
          <Script
            initialId={currentId}
            setCurrentId={setCurrentId}
            setSplashText={setSplashText}
            setSplash={setShowSplash}
          />
        </div>
      )}
    </>
  );
}

export default Stage;
