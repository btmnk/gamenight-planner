import { MantineThemeOverride, Tuple, DefaultMantineColor } from "@mantine/core";

type ExtendedCustomColors = "primary" | "stone" | DefaultMantineColor;

declare module "@mantine/core" {
  export interface MantineThemeOther {
    almostBlack: string;
    textColor: string;
    headerHeight: number;
    displayFont: string;
    discordEmbedBackground: string;
    discordMentionTextColor: string;
    discordMentionBackground: string;
  }

  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, Tuple<string, 10>>;
  }
}

export const Theme: MantineThemeOverride = {
  colorScheme: "dark",
  fontFamily: "Cairo",
  colors: {
    primary: [
      "#EFF3FA",
      "#96B2DC",
      "#5380C6",
      "#355FA0",
      "#284879",
      "#1B3152",
      "#122138",
      "#0D1726",
      "#090F1A",
      "#060A12",
    ],
    stone: [
      "#C7CCD5",
      "#8E98AB",
      "#657188",
      "#4D5567",
      "#3A414E",
      "#2C313B",
      "#1E2128",
      "#14161C",
      "#0E0F13",
      "#090A0D",
    ],
  },
  components: {},
  other: {
    almostBlack: "#0a0b0e",
    textColor: "#cdcdcd",
    headerHeight: 60,
    displayFont: "Poppins",
    discordEmbedBackground: "#2f3136",
    discordMentionBackground: "#3c406f",
    discordMentionTextColor: "#c4d1ff",
  },
};
