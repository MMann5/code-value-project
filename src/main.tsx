import { BrowserRouter } from "react-router-dom";
import { store } from "./app.store";
import { Provider } from "react-redux";

const AppProviders = ({ children }: { children: any }) => {
  return (
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  );
};

export default AppProviders;
