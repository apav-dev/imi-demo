import { Image } from "@yext/pages/components";
import { CardComponent, CardProps } from "@yext/search-ui-react";
import * as React from "react";
import Location from "../types/locations";

const LocationCard: CardComponent<Location> = ({
  result,
}: CardProps<Location>): JSX.Element => {
  const location = result.rawData;

  return (
    <div className="flex border-y p-4">
      <div className="mr-4 h-full  w-20">
        {location.logo && <Image layout="fill" image={location.logo} />}{" "}
      </div>
      <div>
        <h3 className="text-xl font-semibold">{location.name}</h3>
        <p>{location.address.line1}</p>
        <p>{`${location.address.city}, ${location.address.region} ${location.address.postalCode}`}</p>
      </div>
    </div>
  );
};

export default LocationCard;
