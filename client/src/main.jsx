import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
   palette: {
      mode: "dark",
   },
});

createRoot(document.getElementById("root")).render(
   <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <App />
   </ThemeProvider>
);
