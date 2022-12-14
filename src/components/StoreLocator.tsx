import * as React from "react";
import {
  FilterSearch,
  MapboxMap,
  OnSelectParams,
  StandardCard,
  VerticalResults,
} from "@yext/search-ui-react";
import {
  Matcher,
  SelectableStaticFilter,
  useSearchActions,
} from "@yext/search-headless-react";
import { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";

// 1. Location Results: Toggle between map and list view on Mobile
// 2. Location Results: Custom Cards
// 3. Custom Pins with popups
// 4. Search on drag

const StoreLocator = (): JSX.Element => {
  const [showResults, setShowResults] = useState(true);

  const searchActions = useSearchActions();

  useEffect(() => {
    searchActions.executeVerticalQuery();
  }, []);

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
        customCssClasses={{
          filterSearchContainer: "mb-0",
        }}
        onSelect={handleFilterSelect}
        placeholder="Find Locations Near You"
        searchFields={[
          {
            entityType: "location",
            fieldApiName: "builtin.location",
          },
        ]}
      />
      <div className="py-4 justify-center space-x-2 flex">
        <p>Map</p>
        <Switch
          checked={showResults}
          onChange={setShowResults}
          className={`${
            showResults ? "bg-blue-600" : "bg-gray-200"
          } relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={`${
              showResults ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
        <p>Results</p>
      </div>
      <div className="relative mb-4 h-[calc(100vh-132px)]">
        <MapboxMap
          mapboxAccessToken={import.meta.env.YEXT_PUBLIC_MAPBOX_API_KEY || ""}
        />
        {showResults && (
          <div className="absolute top-0 bottom-0 left-0 right-0 bg-white">
            <VerticalResults CardComponent={StandardCard} />
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreLocator;
