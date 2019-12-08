import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";
import getRandomInt from "../../utils/getRandomInt";

const initColor = "rgb(150, 150, 150)";

const Circle = ({ size, sizeOffset, i }) => {
  const [sizeState, setSizeState] = useState(size);
  const [color, setColor] = useState(initColor);

  useEffect(() => {
    setSizeState(size);
  }, [size]);

  const randomColor = () => {
    return `rgb(${getRandomInt(0, 255)}, ${getRandomInt(
      0,
      255
    )}, ${getRandomInt(0, 255)})`;
  };

  const hoverState = () => {
    setSizeState(getRandomInt(size - sizeOffset, size + sizeOffset));
    setColor(randomColor);
  };

  const normalState = () => {
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
  size: PropTypes.number,
  sizeOffset: PropTypes.number
};

Circle.defaultProps = {
  size: 1,
  sizeOffset: 10
};

export default Circle;
