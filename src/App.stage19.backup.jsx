import { HashRouter } from "react-router-dom";
import AppRoutes from "./app/AppRoutes";
import ErrorBoundary from "./components/core/ErrorBoundary";

export default function App() {
  return (
    <ErrorBoundary>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </ErrorBoundary>
  );
}
