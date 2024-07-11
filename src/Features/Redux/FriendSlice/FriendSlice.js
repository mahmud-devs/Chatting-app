import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  friendsDataRedux: localStorage.getItem("FriendsData") ? JSON.parse(localStorage.getItem("FriendsData")) : {},
};

export const FriendSlice = createSlice({
  name: "FriendSlice",
  initialState: initialState,
  reducers: {
    friendsData: (state, action) => {
        state.friendsDataRedux = action.payload
        localStorage.setItem("FriendsData",JSON.stringify(state.friendsDataRedux))
    },
  },
});

// Action creators are generated for each case reducer function
export const { friendsData } = FriendSlice.actions;

export default FriendSlice.reducer;
