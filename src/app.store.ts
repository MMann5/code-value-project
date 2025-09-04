import { combineReducers } from "redux";
import { createLogger } from "redux-logger";
import { REDUCER } from "./redux/reducer.enum";
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./redux/reducer/productReducer";

const reducers = combineReducers({
  [REDUCER.PRODUCTS]: productsReducer,
});

const logger = createLogger();

const middleware = (getDefaultMiddleware: any) => {
  const middlewares = getDefaultMiddleware({
    serializableCheck: false,
  });

  if (import.meta.env.MODE === "development") {
    middlewares.push(logger);
  }

  return middlewares;
};

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    middleware(getDefaultMiddleware).concat(logger),
});

export { store };
