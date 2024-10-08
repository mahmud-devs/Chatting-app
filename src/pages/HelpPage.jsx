import React, { useState, createRef, useEffect } from "react";
// ========== react cropper =============
import { v4 as uuidv4 } from "uuid";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import starterImg from "../assets/defaultImg.jpg";
// ========== react cropper =============

// ============ firebase storage =================
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import {
  getDatabase,
  set,
  ref as dbRef,
  push,
  onValue,
} from "firebase/database";
import { getAuth } from "firebase/auth";
// ============ firebase storage =================
import { ToastContainer, toast, Bounce } from "react-toastify";
import moment from "moment";
// ================ react modal ================
import Modal from "react-modal";
import { TiGroup } from "react-icons/ti";
import { IoMdCloseCircleOutline } from "react-icons/io";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
  },
};

const HelpPage = () => {
  // =============== all states ====================
  const db = getDatabase();
  const auth = getAuth();
  const storage = getStorage();
  // ============= input  state ==============
  const [allInput, setallInput] = useState({
    groupTagName: "",
    groupName: "",
    GroupPhoto: "",
  });
  // ========== input error state ============
  const [allInputError, setallInputError] = useState({
    GroupTagNameErr: "",
    GroupNameErr: "",
  });

  // ============== set Loading state ===============
  const [loading, setloading] = useState(false);

  // ============= modal state ================
  const [modalIsOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
    setallInputError({
      ...allInputError,
      GroupNameErr: "",
      GroupTagNameErr: "",
    });
  }
  function openModal() {
    setIsOpen(true);
  }

  // =========== react cropper state =============
  const [image, setImage] = useState(starterImg);
  const [cropData, setCropData] = useState("#");
  const cropperRef = createRef();

  // ============== handle submit function ================
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  // ============= handle input function ========
  const handleInput = (e) => {
    setallInput({
      ...allInput,
      [e.target.id]: e.target.value,
    });
  };

  // ============= react cropper functionality ==================
  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  // =============== image cropper functionality ================

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setallInput({
        ...allInput,
        GroupPhoto: cropperRef.current?.cropper.getCroppedCanvas().toDataURL(),
      });
      toast.success("Image Cropped Successfully!", {
        position: "top-center",
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  // ============ Handle Create Group ==================
  const handleCreatGroup = () => {
    if (!allInput.groupName) {
      setallInputError({
        ...allInputError,
        GroupNameErr: "please insert a name",
      });
    } else if (!allInput.groupTagName) {
      setallInputError({
        ...allInputError,
        GroupNameErr: "",
        GroupTagNameErr: "please insert a tag name",
      });
    } else if (!allInput.GroupPhoto) {
      setallInputError({
        ...allInputError,
        GroupNameErr: "",
        GroupTagNameErr: "",
      });
      toast.error("please crop an image", {
        position: "top-center",
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else {
      setloading(true);
      setallInputError({
        ...allInputError,
        GroupNameErr: "",
        GroupTagNameErr: "",
      });

      const storageRef = ref(storage, `Group-Image/images${uuidv4()}`);
      // Data URL string
      const message4 = allInput.GroupPhoto;

      uploadString(storageRef, message4, "data_url")
        .then((snapshot) => {
          console.log("Uploaded a data_url string!");
        })
        .then(() => {
          getDownloadURL(storageRef)
            .then((downloadURL) => {
              console.log("File available at", downloadURL);
              set(push(dbRef(db, "grouplist/")), {
                GroupName: allInput.groupName,
                GroupTagName: allInput.groupTagName,
                GroupPhotoUrl: downloadURL,
                AdminUid: auth.currentUser.uid,
                AdminUserName: auth.currentUser.displayName,
                AdminEmail: auth.currentUser.email,
                AdminProfilePic: auth.currentUser.photoURL,
                createdDate: moment().format("MM//DD/YYYY, h:mm:ss a"),
              });
            })
            .then(() => {
              toast.success("Group created successfully", {
                position: "top-center",
                autoClose: 6000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
              });
            })
            .catch((err) => {
              alert(err);
            })
            .finally(() => {
              setloading(false);
              closeModal();
            });
        });
    }
  };

  return (
    <>
      <div className="flex h-[100%] w-full items-center justify-center">
        <div>
          <button
            onClick={openModal}
            type="button"
            class="relative  inline-flex items-center rounded-lg bg-btnColor px-5 py-2.5 text-center text-[17px] font-medium text-white focus:outline-none focus:ring-4 focus:ring-btnColor"
          >
            <TiGroup className="me-[7px] text-[24px]" />
            Creat Group
          </button>
          {/* ================ modal body ========== */}
          <Modal
            isOpen={modalIsOpen}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <button
              onClick={closeModal}
              className="mb-2 flex h-[40px] w-[40px] items-center justify-center rounded-full bg-red text-[35px] text-white "
            >
              <IoMdCloseCircleOutline />
            </button>
            <h2 className="mb-3 text-center font-open text-[25px] font-semibold">
              Group Information
            </h2>
            <form onSubmit={handleSubmit}>
              {/* =========== group name input =============== */}

              <div className="mb-7">
                <label
                  htmlFor="email"
                  className="mb-2 flex text-[20px] font-semibold capitalize text-darkBlue "
                >
                  Group name <span className="text-red">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Group Name"
                  id="groupName"
                  name="groupName"
                  autoComplete="off"
                  className=" w-full rounded-md border-2 border-darkBlue border-opacity-30 px-[20px] py-[15px] text-[15px] focus:outline-none"
                  onChange={handleInput}
                />
                {allInputError.GroupNameErr && (
                  <span
                    className="ms-2 mt-2 inline-block font-normal text-[red] "
                    id="GroupNameErr"
                  >
                    {allInputError.GroupNameErr}
                  </span>
                )}
              </div>
              {/* =========== group tag name input =============== */}

              <div className="mb-7">
                <label
                  htmlFor="email"
                  className="mb-2 flex text-[20px] font-semibold capitalize text-darkBlue "
                >
                  Group Tagname <span className="text-red">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Group TagName"
                  id="groupTagName"
                  name="groupTagName"
                  autoComplete="off"
                  className=" w-full rounded-md border-2 border-darkBlue border-opacity-30 px-[20px] py-[15px] text-[15px] focus:outline-none"
                  onChange={handleInput}
                />
                {allInputError.GroupTagNameErr && (
                  <span
                    className="ms-2 mt-2 inline-block font-normal text-[red] "
                    id="GroupTagNameErr"
                  >
                    {allInputError.GroupTagNameErr}
                  </span>
                )}
              </div>
              {/* =========== image croper input =============== */}
              <div className="flex justify-between">
                <div className="w-[40%]">
                  <input type="file" onChange={onChange} />
                </div>
                <div className="flex w-[44%] justify-between">
                  <h3 className="font-open font-semibold capitalize">
                    Image preview
                  </h3>
                  <button
                    className="relative  inline-flex items-center rounded-lg bg-btnColor px-3 py-1 text-center text-[17px] font-medium text-white "
                    onClick={getCropData}
                  >
                    Crop Image
                  </button>
                </div>
              </div>
              <div className="flex h-[220px] w-full items-center justify-between">
                <div className="w-[44%]">
                  <Cropper
                    ref={cropperRef}
                    style={{ width: "100%", height: "200px" }}
                    zoomTo={0.5}
                    initialAspectRatio={1}
                    preview=".img-preview"
                    src={image}
                    viewMode={1}
                    minCropBoxHeight={10}
                    minCropBoxWidth={10}
                    background={false}
                    responsive={true}
                    autoCropArea={1.6}
                    checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                    guides={true}
                  />
                </div>

                <div className="w-[44%]">
                  <div className="box h-[200px] w-full overflow-hidden bg-[rgba(0,0,0,0.4)]">
                    <div
                      className="img-preview block overflow-hidden"
                      style={{ height: "100%", width: "100%" }}
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="relative w-full rounded-lg bg-btnColor py-4 text-center font-nunito text-[20px] text-base font-semibold capitalize text-white"
                onClick={handleCreatGroup}
              >
                Creat group
                {loading && (
                  <div className="bg-transparent absolute  left-[40%] top-[33%] h-5 w-5 animate-spin rounded-full border-[3.5px] border-b-gray border-l-white border-r-gray border-t-white"></div>
                )}
              </button>
            </form>
          </Modal>
          {/* ================ modal body ========== */}
        </div>
      </div>
    </>
  );
};

export default HelpPage;
