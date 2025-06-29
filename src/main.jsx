// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./Utils/Contexts/AuthContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorBoundary from "./Pages/Components/ErrorBoundary.jsx";
import App from "./App.jsx";
import "./App.css";

const queryClient = new QueryClient();

console.log("Starting React app...");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>
);
