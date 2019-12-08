import React, { useEffect, useState } from "react";
import Circle from "./components/Circle";
import styles from "./App.module.css";
import getRandomInt from "./utils/getRandomInt";

const maxDiff = 35;

const App = () => {
  const [maxSize, setMaxSize] = useState(350);

  useEffect(() => {
    updateWhenResize();
    window.addEventListener("resize", updateWhenResize);
    return () => window.removeEventListener("resize", updateWhenResize);
  }, []);

  const circles = maxSize => {
    const circleComp = [];
    let size = maxSize;
    let sizeDif = getRandomInt(5, maxDiff);
    let i = 0;
    while (size > 0) {
      circleComp.push(
        <Circle key={`circle-${i++}`} size={size} sizeOffset={sizeDif * 5} />
      );
      size -= sizeDif;
      sizeDif = getRandomInt(5, maxDiff);
    }
    return circleComp;
  };

  const updateWhenResize = () => {
    const _maxSize =
      window.innerWidth > window.innerHeight
        ? window.innerHeight
        : window.innerWidth;
    setMaxSize(_maxSize - 20);
  };
  return <div className={styles.App}>{circles(maxSize)}</div>;
};

export default App;
