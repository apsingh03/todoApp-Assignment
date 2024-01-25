import { configureStore, Tuple } from "@reduxjs/toolkit";

import AddDataSlice from "./Slices/AddDataSlice";

export const store = configureStore({
  reducer: {
    getData: AddDataSlice,
  },
});
