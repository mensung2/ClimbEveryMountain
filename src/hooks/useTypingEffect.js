import { useState, useEffect } from "react";

function useTypingEffect(text, speed = 50) {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    setDisplayText(""); // 초기화
    let index = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) => prev + text[index]);
      index++;
      if (index === text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval); // cleanup
  }, [text, speed]);

  return displayText;
}

export default useTypingEffect;
