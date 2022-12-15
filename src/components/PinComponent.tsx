// you need to install react icons (npm i react-icons) to use this icon
import * as React from "react";
import { PinComponent, Coordinate } from "@yext/search-ui-react";
import { Popup, LngLatLike } from "mapbox-gl";
import Location from "../types/locations";
import { useCallback, useRef, useState } from "react";
import { Transition } from "@headlessui/react";
import { IconContext } from "react-icons";
import { BiMapPin } from "react-icons/bi";
import { IoMdPin } from "react-icons/io";

// transforms the Yext Display Coordiate into the format that Mapbox expects
const transformToMapboxCoord = (coordinate: Coordinate): LngLatLike => ({
  lng: coordinate.longitude,
  lat: coordinate.latitude,
});

const MapPin: PinComponent<Location> = (props) => {
  const [showCard, setShowCard] = useState(false);
  const [hover, setHover] = useState(false);

  const { mapbox, result } = props;

  // grab the coordinates from the result
  const yextCoordinate = result.rawData.yextDisplayCoordinate;

  // manage the open state of the popup with useState and useRef
  const [active, setActive] = useState(false);
  const popupRef = useRef(
    new Popup({ offset: 15 }).on("close", () => setActive(false))
  );

  // useEffect(() => {
  //   // render the popup on the map when the active state changes
  //   if (active && yextCoordinate) {
  //     popupRef.current
  //       .setLngLat(transformToMapboxCoord(yextCoordinate))
  //       .setText(result.name || "unknown location")
  //       .addTo(mapbox);
  //   }
  // }, [active, mapbox, result, yextCoordinate]);

  // create a callback to open the popup on click
  const handleClick = useCallback(() => {
    setActive(true);
  }, []);

  return (
    // return the pin component with the onClick handler
    <div className="relative z-10">
      <Transition
        show={showCard}
        enter="transition-opacity duration-750"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="absolute -inset-x-24 bottom-12 z-50 h-24 w-60 gap-5 rounded-md bg-white p-4 align-middle shadow-sm shadow-stone-400/5">
          <div className="my-auto mx-auto flex flex-row">
            <div className="my-auto">
              <h3 className="text-lg font-normal">{result.name}</h3>
              {/* <div className="font-sans text-stone-500">
                <p className="text-xs">
                  {address?.line1}, {address?.line2}
                </p>
                <p className="text-xs">
                  {address?.city}, {address?.region}, {address?.postalCode}
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </Transition>
      <IconContext.Provider
        value={{
          color: hover ? "white" : "red",
          size: "36px",
        }}
      >
        <div
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
