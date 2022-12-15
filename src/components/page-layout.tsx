import * as React from "react";
import Header from "./Header";

type Props = {
  children?: React.ReactNode;
};

const PageLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen font-primary">
      {/* <Header /> */}
      {children}
    </div>
  );
};

export default PageLayout;
