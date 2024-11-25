import React from "react"
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./components/theme.js";
import App from "./App.js"

import './index.css';
import { setupConfig } from "@girishsawant999/react-translate-with-google-api";

setupConfig({
  clientEmail: import.meta.env.VITE_GCP_CLIENT_SERVICE_ACC_EMAIL,
  privateKey: import.meta.env.VITE_APP_GCP_PRIVATE_KEY,
  projectId: import.meta.env.VITE_APP_GCP_PROJECT_ID,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </StrictMode>
);
