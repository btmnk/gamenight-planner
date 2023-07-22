import { Global } from "@mantine/core";
import React from "react";

import CairoRegular from "./fonts/Cairo-Regular.ttf";
import CairoBold from "./fonts/Cairo-Bold.ttf";
import CairoBlack from "./fonts/Cairo-Black.ttf";

const CustomFonts: React.FC = () => {
  return (
    <Global
      styles={[
        {
          "@font-face": {
            fontFamily: "Cairo",
            src: `url('${CairoRegular}') format("truetype")`,
            fontStyle: "normal",
          },
        },
        {
          "@font-face": {
            fontFamily: "Cairo",
            src: `url('${CairoBold}') format("truetype")`,
            fontWeight: 500,
            fontStyle: "normal",
          },
        },
        {
          "@font-face": {
            fontFamily: "Cairo",
            src: `url('${CairoBlack}') format("truetype")`,
            fontWeight: 900,
            fontStyle: "normal",
          },
        },
      ]}
    />
  );
};

export { CustomFonts };
