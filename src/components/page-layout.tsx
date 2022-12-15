import * as React from "react";
type Props = {
  children?: React.ReactNode;
};

const PageLayout = ({ children }: Props) => {
  return <div className="min-h-screen font-primary">{children}</div>;
};

export default PageLayout;
