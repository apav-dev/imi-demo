import * as React from "react";
import {
  provideHeadless,
  SearchHeadlessProvider,
  SandboxEndpoints,
  useSearchActions,
} from "@yext/search-headless-react";
import { useEffect } from "react";

const searcher = provideHeadless({
  apiKey: "54e3a5754b69c2f65869d6893ef4bbea",
  experienceKey: "imi",
  locale: "en",
  endpoints: SandboxEndpoints,
});

interface SearchExperienceProps {
  children: React.ReactNode;
  verticalKey?: string;
}

const SearchExperience = ({ children, verticalKey }: SearchExperienceProps) => {
  return (
    <SearchHeadlessProvider searcher={searcher}>
      <StateManager verticalKey={verticalKey}>{children}</StateManager>
    </SearchHeadlessProvider>
  );
};

const StateManager = ({
  children,
  verticalKey,
}: {
  children: React.ReactNode;
  verticalKey?: string;
}) => {
  const searchActions = useSearchActions();

  useEffect(() => {
    verticalKey && searchActions.setVertical(verticalKey);
  }, [verticalKey]);

  return <>{children}</>;
};

export default SearchExperience;
