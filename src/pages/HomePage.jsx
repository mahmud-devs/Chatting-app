import React, { useEffect, useState } from "react";
import GroupList from "../Components/HomeComponents/HomePageComponents/GroupList/GroupList";
import FriendList from "../Components/HomeComponents/HomePageComponents/FriendList/FriendList";
import UserList from "../Components/HomeComponents/HomePageComponents/UserList/UserList";
import FriendRequest from "../Components/HomeComponents/HomePageComponents/FriendRequest/FriendRequest";
import BlockedUsers from "../Components/HomeComponents/HomePageComponents/BlockedUsers/BlockedUsers";
import MyGroupList from "../Components/HomeComponents/HomePageComponents/MyGroupList/MyGroupList";
const HomePage = () => {
  return (
    <>
      <div className="flex h-[100%] w-full flex-wrap justify-between gap-y-[10px]">
        <GroupList />
        <FriendList />
        <UserList />
        <FriendRequest />
        <MyGroupList/>
        <BlockedUsers/>
      </div>
    </>
  );
};

export default HomePage;
