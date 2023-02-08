import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  // NOTE:https://mui.com/material-ui/api/button/#css
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", // 英語のuppercaseを打ち消す
        },
        outlined: {
          background: "white",
        },
        sizeMedium: {
          minWidth: 90,
          paddingLeft: 20,
          paddingRight: 20,
        },
      },
    },
  },
});
