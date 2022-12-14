import * as React from "react";
import {
  FilterSearch,
  MapboxMap,
  OnSelectParams,
  VerticalResults,
} from "@yext/search-ui-react";
import {
  Matcher,
  SelectableStaticFilter,
  useSearchActions,
  useSearchState,
} from "@yext/search-headless-react";
import { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import LocationCard from "./LocationCard";
import useWindowDimensions from "../hooks/useWindowDimensions";
import PinComponent from "./PinComponent";
import "mapbox-gl/dist/mapbox-gl.css";

const StoreLocator = (): JSX.Element => {
  const windowDimensions = useWindowDimensions();

  const [showResults, setShowResults] = useState(true);

  const searchActions = useSearchActions();
  const verticalKey = useSearchState((state) => state.vertical.verticalKey);

  useEffect(() => {
    verticalKey && searchActions.executeVerticalQuery();
  }, [verticalKey]);

  useEffect(() => {
    if (windowDimensions && windowDimensions.width > 768) {
      setShowResults(true);
    }
  }, [windowDimensions]);

  const handleFilterSelect = (params: OnSelectParams) => {
    const locationFilter: SelectableStaticFilter = {
      selected: true,
      filter: {
        kind: "fieldValue",
        fieldId: params.newFilter.fieldId,
        value: params.newFilter.value,
        matcher: Matcher.Equals,
      },
    };
    searchActions.setStaticFilters([locationFilter]);
    searchActions.executeVerticalQuery();
  };

  return (
    <div>
      <FilterSearch
        onSelect={handleFilterSelect}
        placeholder="Find Locations Near You"
        searchFields={[
          {
            entityType: "location",
            fieldApiName: "builtin.location",
          },
        ]}
      />
      <div className="flex justify-center space-x-2 bg-zinc-100 py-4 shadow-lg md:hidden">
        <p>Map</p>
        <Switch
          checked={showResults}
          onChange={setShowResults}
          className={`${
            showResults ? "bg-red-500" : "bg-zinc-300"
          } relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={`${
              showResults ? "translate-x-6 " : "translate-x-1 bg-red-500"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
        <p>Results</p>
      </div>
      <div className="relative h-[calc(100vh-224px)] md:flex md:h-[calc(100vh-220px)] md:border">
        {showResults && (
          <div
            className={
              "absolute top-0 bottom-0 left-0 right-0 z-[5] overflow-y-auto bg-white md:static md:h-full md:w-1/3"
            }
          >
            <VerticalResults CardComponent={LocationCard} />
          </div>
        )}
        <div className="absolute z-0 h-full w-full md:static md:h-[calc(100vh-220px)]">
          <MapboxMap
            mapboxAccessToken={import.meta.env.YEXT_PUBLIC_MAPBOX_API_KEY || ""}
            PinComponent={PinComponent}
            mapboxOptions={{
              style: "mapbox://styles/mapbox/streets-v11",
              center: [-73.985664, 40.74844],
              zoom: 12,
              interactive: true,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default StoreLocator;
