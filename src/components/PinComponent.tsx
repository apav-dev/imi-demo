/* eslint-disable react/prop-types */
import * as React from "react";
import { PinComponent, Coordinate } from "@yext/search-ui-react";
import { Popup, LngLatLike } from "mapbox-gl";
import Location from "../types/locations";
import { useCallback, useEffect, useRef, useState } from "react";
import { IconContext } from "react-icons";
import { IoMdPin } from "react-icons/io";

const transformToMapboxCoord = (coordinate: Coordinate): LngLatLike => ({
  lng: coordinate.longitude,
  lat: coordinate.latitude,
});

const MapPin: PinComponent<Location> = (props) => {
  const [hover, setHover] = useState(false);

  const { mapbox, result } = props;
  const location = result.rawData;

  // grab the coordinates from the result
  const yextCoordinate = location.yextDisplayCoordinate;
  const address = location.address;

  // manage the open state of the popup with useState and useRef
  const [active, setActive] = useState(false);
  const popupRef = useRef(
    new Popup({ offset: 15 }).on("close", () => setActive(false))
  );

  useEffect(() => {
    // render the popup on the map when the active state changes
    if (active && yextCoordinate) {
      popupRef.current
        .setLngLat(transformToMapboxCoord(yextCoordinate))
        .setHTML(
          `<strong>${location.name}</strong><p>${address?.city}, ${address?.region}, ${address?.postalCode}</p>`
        )
        .addTo(mapbox);
    }
  }, [active, mapbox, result, yextCoordinate]);

  // create a callback to open the popup on click
  const handleClick = useCallback(() => {
    setActive(true);
  }, []);

  return (
    // return the pin component with the onClick handler
    <div className="relative z-10">
      <IconContext.Provider
        value={{
          color: hover ? "black" : "red",
          size: "36px",
        }}
      >
        <div
          onClick={handleClick}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <IoMdPin />
        </div>
      </IconContext.Provider>
    </div>
  );
};

export default MapPin;
