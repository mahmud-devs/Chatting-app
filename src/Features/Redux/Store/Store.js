import { configureStore } from "@reduxjs/toolkit";

import FriendData from "../FriendSlice/FriendSlice.js";

export const store = configureStore({
  reducer: {
    FriendData: FriendData,
  },
});
