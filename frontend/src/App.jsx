import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./router";

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
