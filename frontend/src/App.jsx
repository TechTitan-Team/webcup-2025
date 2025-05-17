import { TemplateProvider } from "./context/TemplateContext";
import Router from "./router/router";

const App = () => {
  return (
    <TemplateProvider>
      <Router />
    </TemplateProvider>
  );
};

export default App;
