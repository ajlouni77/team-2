import React, { useState, useEffect } from "react";
import { auth, database } from "../Register/firebaseConfig";
import { ref, set, get, child } from "firebase/database";
import { getAuth } from "firebase/auth";
import axios from "axios";
import Swal from "sweetalert2";
import Navbar from "../Navbar/Navbar";

const UserProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [originalUserData, setOriginalUserData] = useState(null);
  const [user, setUserData] = useState({
    username: "",
    email: "",
    userType: "user",
    profilePicture: "https://bootdey.com/img/Content/avatar/avatar7.png",
  });

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserData({
        ...parsedUser,
        profilePicture: parsedUser.profilePicture || "https://bootdey.com/img/Content/avatar/avatar7.png",
      });
    }
  }, []);

  const handleEdit = async () => {
    if (editMode) {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to save these changes?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, save it!",
        cancelButtonText: "Cancel",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const auth = getAuth();
          const userUid = auth.currentUser?.uid;

          if (!userUid) {
            Swal.fire("Error!", "User not authenticated.", "error");
            return;
          }

          try {
            await axios.put(`https://react-team-project-e3fab-default-rtdb.firebaseio.com/users/${userUid}.json`, {
              name: user.username,
              email: user.email,
              userType: user.userType,
              profilePicture: user.profilePicture,
            });

            sessionStorage.setItem("user", JSON.stringify(user));
            Swal.fire("Saved!", "Your changes have been saved successfully.", "success");
          } catch (error) {
            console.error("❌ Error updating data:", error);
            Swal.fire("Error!", "Failed to update data.", "error");
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          setUserData(originalUserData); // ❌ استعادة البيانات الأصلية
        }

        setEditMode(false); // ✅ الخروج من وضع التعديل في كل الحالات
      });
    } else {
      setOriginalUserData({ ...user }); // ✅ حفظ البيانات قبل التعديل
      setEditMode(true);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const imageBase64 = reader.result;

      const auth = getAuth();
      const userUid = auth.currentUser?.uid;

      if (!userUid) {
        Swal.fire("Error!", "User not authenticated.", "error");
        return;
      }

      try {
        await axios.put(`https://react-team-project-e3fab-default-rtdb.firebaseio.com/users/${userUid}.json`, {
          ...user,
          profilePicture: imageBase64,
        });

        const updatedUser = { ...user, profilePicture: imageBase64 };
        sessionStorage.setItem("user", JSON.stringify(updatedUser));
        setUserData(updatedUser);

        Swal.fire("Success!", "Profile picture updated successfully.", "success");
      } catch (error) {
        console.error("❌ Error updating picture:", error);
        Swal.fire("Error!", "Failed to update profile picture.", "error");
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <Navbar />
      <div className="h-screen bg-gray-100 flex flex-col items-center p-10">
        <div className="max-w-7xl w-full bg-white shadow-lg rounded-xl p-10 flex flex-col md:flex-row justify-between gap-6">
          <div className="flex flex-col justify-center items-center w-full md:w-1/3 border-r border-gray-300 pr-12 space-y-4">
            <img className="w-32 h-32 rounded-full border-4 border-blue-500" src={user.profilePicture} alt="Profile" />
            <h2 className="text-2xl font-bold">{user.username}</h2>
            <p className="text-gray-600 text-lg">Full Stack Developer</p>
            <p className="text-gray-500">{user.address}</p>
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="fileInput" />

            <label htmlFor="fileInput" className="mt-4 inline-block text-white px-5 py-3 rounded-lg cursor-pointer hover:bg-blue-700" style={{ backgroundColor: "#047cfc" }}>
              Change Picture
            </label>
          </div>

          <div className="w-full md:w-2/3 flex-1 space-y-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">User Information</h3>
              {editMode ? (
                <div className="space-y-4">
                  <input className="border p-3 w-full rounded-md" type="text" value={user.username} onChange={(e) => setUserData({ ...user, username: e.target.value })} />
                  <input className="border p-3 w-full rounded-md" type="email" value={user.email} disabled />
                  <input className="border p-3 w-full rounded-md" type="text" value={user.userType} disabled />
                </div>
              ) : (
                <div className="text-lg space-y-2">
                  <p>
                    <strong>Full Name:</strong> {user.username}
                  </p>
                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p>
                    <strong>User Type:</strong> {user.userType}
                  </p>
                </div>
              )}
              <button onClick={handleEdit} className="mt-4 bg-teal-500 text-white px-5 py-3 rounded-lg text-lg">
                {editMode ? "Save" : "Edit"}
              </button>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Project Status</h3>
              <div className="space-y-4 text-lg">
                <p>Web Design <span className="block h-3 bg-blue-500 w-3/4 rounded-full"></span></p>
                <p>Website Markup <span className="block h-3 bg-blue-500 w-2/3 rounded-full"></span></p>
                <p>One Page <span className="block h-3 bg-blue-500 w-4/5 rounded-full"></span></p>
                <p>Mobile Template <span className="block h-3 bg-blue-500 w-1/2 rounded-full"></span></p>
                <p>Backend API <span className="block h-3 bg-blue-500 w-3/5 rounded-full"></span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
