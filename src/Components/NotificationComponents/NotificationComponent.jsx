import React, { useEffect, useState } from "react";
import Search from "../HomeComponents/HomePageComponents/HomePageCommonComponents/Search";
import profilepic from "../../assets/HomePageImage/three.gif";
// ================ firebase import =================
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { getAuth } from "firebase/auth";
import moment from "moment";
const NotificationComponent = () => {
  // ============ firebase database and auth ===============
  const db = getDatabase();
  const auth = getAuth();

  // ===================== all states =================
  const [AllNotification, setAllNotification] = useState([]);

  // ================== read data from All notification ==================
  useEffect(() => {
    const AllNotificationdbRef = ref(db, "AllNotification/");
    onValue(AllNotificationdbRef, (snapshot) => {
      let AllNotificationdArr = [];
      snapshot.forEach((item) => {
        if (auth.currentUser.uid === item.val().NotificationReceiverUid) {
          AllNotificationdArr.push({
            ...item.val(),
            NotificationListKey: item.key,
          });
        }
      });
      // console.log(blockArr);
      setAllNotification(AllNotificationdArr);
    });
  }, [db]);

  return (
    <>
      <div>
        <Search />
      </div>
      <div className="b mt-10 h-[80vh] w-full overflow-y-scroll  scrollbar-thin">
        <div className=" h-[100%] ">
          <div className="flex w-full flex-col-reverse gap-y-5 ">
            {/* ================= All notification ==================== */}
            {AllNotification?.map((item) => (
              <div class="flex items-start gap-2.5">
                <img
                  src={item.NotificationProfilePic}
                  alt="profilepic"
                  className="h-[80px] w-[80px] rounded-full object-cover shadow-lg"
                />
                <div class="leading-1.5  flex  w-full max-w-[90%] flex-col rounded-e-xl rounded-es-xl bg-[#F3F4F6] p-4">
                  <div class="flex items-center space-x-2 rtl:space-x-reverse">
                    <span class="text-md font-semibold capitalize text-customBlack ">
                      {item.NotificationName}
                    </span>
                    <span class="text-md  font-normal text-customBlack">
                      {moment(item.createdDate).fromNow()}
                    </span>
                  </div>
                  <p class="text-md capitaliz py-2.5 font-normal text-customBlack ">
                    {item.NotificationMessege}
                  </p>
                </div>
              </div>
            ))}
            {/* ================= All notification ==================== */}
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationComponent;
