import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";
import getRandomInt from "../../utils/getRandomInt";

const initColor = "rgb(150, 150, 150)";
const transitionTime = 250;

const Circle = ({ size, sizeOffset, isAnimating }) => {
  const [sizeState, setSizeState] = useState(size);
  const [color, setColor] = useState(initColor);

  useEffect(() => {
    setSizeState(size);
  }, [size]);

  useEffect(() => {
    if (isAnimating) {
      setSizeState(getRandomInt(size, size + sizeOffset));
      setColor(randomColor);
      const animate = setTimeout(() => {
        setColor(initColor);
        setSizeState(size);
      }, transitionTime);
      return () => clearTimeout(animate);
      // const autoEffect = setInterval(() => {
      //   console.log(transitionTime);
      //   setSizeState(getRandomInt(size, size + sizeOffset));
      //   setColor(randomColor);
      //   setInterval(() => {
      //     setColor(initColor);
      //     setSizeState(size);
      //   }, transitionTime * 2);
      // }, transitionTime);
      // return () => clearInterval(autoEffect);
    }
  }, [isAnimating]);

  const randomColor = () => {
    return `rgb(
      ${getRandomInt(0, 255)},
      ${getRandomInt(0, 255)},
      ${getRandomInt(0, 255)})`;
  };

  const hoverState = () => {
    if (isAnimating) return;
    setSizeState(getRandomInt(size, size + sizeOffset));
    setColor(randomColor);
  };

  const normalState = () => {
    if (isAnimating) return;
    setColor(initColor);
    setSizeState(size);
  };

  return (
    <div
      className={styles.circle}
      onMouseEnter={hoverState}
      onMouseLeave={normalState}
      onTouchStart={hoverState}
      onTouchEnd={normalState}
      onTouchCancel={normalState}
      style={{
        width: `${sizeState}px`,
        height: `${sizeState}px`,
        borderColor: color
      }}
    ></div>
  );
};

Circle.propTypes = {
  isAnimating: PropTypes.bool,
  size: PropTypes.number,
  sizeOffset: PropTypes.number
};

Circle.defaultProps = {
  size: 1,
  sizeOffset: 10
};

export default Circle;
