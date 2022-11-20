import {extendTheme, withDefaultColorScheme} from "@chakra-ui/react";

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
    primary: "#2691EA",
    blue: {
        500: "#2691EA",
    },
    black: {
        "00": "#000",
        "26": "#262626",
        "8c": "#8c8c8c",
    },
    white: "#fff",
    green: "#52C41A",
};

const styles = {
    global: (props: any) => ({
        body: {
            fontFamily: `'Works Sans', sans-serif`,
        },
        button: {
            fontFamily: `Montserrat, sans-serif`,
        },
    }),
    heading: {
        fontFamily: `Montserrat, sans-serif`,
    },
};

export const theme = extendTheme(
    {
        colors,
        styles,
    },
    withDefaultColorScheme({colorScheme: "blue"})
);
