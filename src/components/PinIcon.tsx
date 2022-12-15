import * as React from "react";
import { BiMapPin } from "react-icons/bi";
import { IconContext } from "react-icons";
import { useState } from "react";

const PinIcon = () => {
  const [hover, setHover] = useState(false);

  return (
    <IconContext.Provider
      value={{
        color: hover ? "white" : "red",
        size: "30px",
      }}
    >
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <BiMapPin />
      </div>
    </IconContext.Provider>
  );
};
