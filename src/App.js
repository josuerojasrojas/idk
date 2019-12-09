import React, { useEffect, useState } from "react";
import Circle from "./components/Circle";
import styles from "./App.module.css";
import getRandomInt from "./utils/getRandomInt";

const maxDiff = 40;
const transitionTime = 250;

const App = () => {
  const [maxSize, setMaxSize] = useState(350);
  const [currAnimate, setCurrAnimate] = useState(-1);
  const [circlesData, setCirclesData] = useState([]);
  const [animationLoop, setAnimationLoop] = useState(null);

  useEffect(() => {
    updateWhenResize();
    window.addEventListener("resize", updateWhenResize);
    return () => window.removeEventListener("resize", updateWhenResize);
  }, []);

  useEffect(() => {
    // const statesFunction = {
    //   "#auto": () => {
    //     console.log("auto");
    //     setCurrAnimate((currAnimate + 1) % circlesData.length);
    //   },
    //   "#autorandom": () => {
    //     console.log("random");
    //     setCurrAnimate(getRandomInt(0, circlesData.length));
    //   }
    // };
    // clearInterval(animationLoop);
    //   if (statesFunction[window.location.hash]) {
    //     setAnimationLoop(
    //       setInterval(statesFunction[window.location.hash], transitionTime * 2)
    //     );
    //   }
    animationFunction();

    window.addEventListener("hashchange", animationFunction);
    return () => {
      window.removeEventListener("hashchange", animationFunction, false);
      clearInterval(animationLoop);
    };
  }, [circlesData]);

  const animationFunction = () => {
    const statesFunction = {
      "#auto": () => {
        console.log(currAnimate + 1, circlesData.length);
        console.log("auto", (currAnimate + 1) % circlesData.length);
        setCurrAnimate((currAnimate + 1) % circlesData.length);
      },
      "#autorandom": () => {
        console.log("random");
        setCurrAnimate(getRandomInt(0, circlesData.length));
      }
    };
    clearInterval(animationLoop);
    if (statesFunction[window.location.hash]) {
      setAnimationLoop(
        setInterval(statesFunction[window.location.hash], transitionTime * 2)
      );
    }
  };

  const circles = maxSize => {
    const circleComp = [];
    let size = maxSize;
    let sizeDif = getRandomInt(5, maxDiff);
    let i = 0;
    while (size > 0) {
      circleComp.push({
        isAnimating: i === currAnimate,
        key: `circle-${i++}`,
        size,
        sizeOffset: sizeDif * 5
      });
      size -= sizeDif;
      sizeDif = getRandomInt(5, maxDiff);
    }
    setCirclesData(circleComp);
  };

  const renderCircles = currAnimate => {
    return circlesData.map((props, i) => (
      <Circle {...props} isAnimating={i === currAnimate} />
    ));
  };

  const updateWhenResize = () => {
    const _maxSize =
      window.innerWidth > window.innerHeight
        ? window.innerWidth
        : window.innerHeight;
    circles(_maxSize - 20);
    // setMaxSize(_maxSize - 20);
  };

  return <div className={styles.App}>{renderCircles(currAnimate)}</div>;
};

export default App;
