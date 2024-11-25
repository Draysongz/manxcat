import React from "react"
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./components/theme.js";
import App from "./App.js"
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

import './index.css';




createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </I18nextProvider>
  </StrictMode>
);
