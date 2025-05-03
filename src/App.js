import React, { useEffect, useState } from "react";
import "./App.css";
import Stage from "./Stage";
import useSound from "use-sound";
import StartSound from "./assets/sound/start.mp3";
import ReelSound from "./assets/sound/reel.mp3";

function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [firstChoiceMade, setFirstChoiceMade] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [isPortrait, setIsPortrait] = useState(
    window.innerHeight > window.innerWidth
  );

  const [playOn] = useSound(StartSound, {
    volume: 0.6,
  });
  const [playReel, { stop }] = useSound(ReelSound, {
    volume: 0.2,
  });

  const enterSite = () => {
    setHasEntered(true);
    playReel();
  };

  useEffect(() => {
    const handleResize = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isPortrait) {
    return (
      <div
        className="rotate-message"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <p>가로 모드로 전환해 주세요</p>
      </div>
    );
  }

  const handleChoice = (nextId = "single") => {
    setFirstChoiceMade(true);
    setSelectedId(nextId);

    playOn();
    stop();
  };

  if (!hasEntered) {
    return (
      <div className="intro" onClick={enterSite}>
        <p>
          CLIMB
          <br />
          EVERY
          <br />
          MOUNTAIN
        </p>
      </div>
    );
  }

  return (
    <div className="container">
      {!firstChoiceMade ? (
        <div className="side-on">
          <p>ACT 0</p>
          <hr
            style={{
              width: "30%",
              height: "2px",
              border: 0,
              backgroundColor: "#ddd",
            }}
          />
          <div className="side-choices">
            <button className="side-choice" onClick={() => handleChoice(1)}>
              SCENE I
            </button>
            <button className="side-choice" onClick={() => handleChoice(2)}>
              SCENE II
            </button>
            <button className="side-choice" onClick={() => handleChoice(3)}>
              SCENE III
            </button>
            <button className="side-choice" onClick={() => handleChoice(5)}>
              SCENE V
            </button>
          </div>
        </div>
      ) : (
        <Stage initialId={selectedId} />
      )}
    </div>
  );
}

export default App;
