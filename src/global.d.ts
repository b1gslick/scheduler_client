declare module "*.module.scss" {
  interface IClassNames {
    [className: string]: string;
  }

  const className: IClassNames;
  export = className;
}

export type Props = {
  Component: any;
  pageProps: any;
  router: any;
};

declare module "*png";
declare module "*jpg";
declare module "*jpeg";

declare module "*svg" {
  import React from "react";
  const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}

declare const __PLATFORM__: "mobile" | "desktop";

export type AuthContextType = {
  cookies: { [x: string]: any };
  auth: ({ email, password }: { email: any; password: any }) => Promise<void>;
  logout: () => void;
};
