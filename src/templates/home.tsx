import * as React from "react";
import "../index.css";
import {
  Template,
  GetPath,
  GetHeadConfig,
  HeadConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import PageLayout from "../components/PageLayout";
import Favicon from "../public/yext-favicon.ico";
import SearchExperience from "../components/SearchExperience";
import StoreLocator from "../components/StoreLocator";
import { LocationBias } from "@yext/search-ui-react";
import Header from "../components/Header";

export const getPath: GetPath<TemplateProps> = () => {
  return `index.html`;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
  return {
    title: "IMI Store Locator",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: "IMI store locator",
        },
      },
      {
        type: "link",
        attributes: {
          rel: "icon",
          type: "image/x-icon",
          href: Favicon,
        },
      },
    ],
  };
};

const Static: Template<TemplateRenderProps> = () => {
  return (
    <SearchExperience verticalKey="locations">
      <PageLayout>
        <Header />
        <div className="max-w-[1440px] md:mx-auto md:px-4">
          <StoreLocator />
        </div>
        <LocationBias customCssClasses={{ locationBiasContainer: "py-4" }} />
      </PageLayout>
    </SearchExperience>
  );
};

export default Static;
