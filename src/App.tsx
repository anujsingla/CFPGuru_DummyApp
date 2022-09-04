import "@patternfly/react-core/dist/styles/base.css";
import "./App.css";
import { AppLayout } from "./components/AppLayout";
import { AppRoutes } from "./components/AppRoutes";

function App() {
  return (
    <AppLayout>
      <AppRoutes />
    </AppLayout>
  );
}

export default App;
