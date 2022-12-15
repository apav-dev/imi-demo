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

// 1. Location Results: Toggle between map and list view on Mobile
// 2. Location Results: Custom Cards
// 3. Custom Pins with popups
// 4. Search on drag
// 5. radius search

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
        customCssClasses={
          {
            // filterSearchContainer: "mb-0",
          }
        }
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
      <div className="h-[calc(100vh-224px)] md:flex md:border">
        {showResults && (
          <div className="overflow-y-auto bg-white md:static md:h-full md:w-1/3">
            <VerticalResults CardComponent={LocationCard} />
          </div>
        )}
        <div className="-z-20 h-full md:w-2/3">
          <MapboxMap
            mapboxAccessToken={import.meta.env.YEXT_PUBLIC_MAPBOX_API_KEY || ""}
            PinComponent={PinComponent}
            mapboxOptions={{
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
