/**
 * This is an example of how to create a static template that uses getStaticProps to retrieve data.
 */
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
import PageLayout from "../components/page-layout";
import Favicon from "../public/yext-favicon.ico";
import SearchExperience from "../components/SearchExperience";
import StoreLocator from "../components/StoreLocator";
import { LocationBias } from "@yext/search-ui-react";
import Header from "../components/header";

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
        <div className="max-w-7xl md:mx-auto">
          <StoreLocator />
          {/* <LocationBias /> */}
        </div>
      </PageLayout>
    </SearchExperience>
  );
};

export default Static;
