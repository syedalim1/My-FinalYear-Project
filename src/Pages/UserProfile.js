import { useState } from "react";
import axios from "axios";

const UserProfile = () => {
  const [profileData, setProfileData] = useState({ name: "", email: "" });

  const updateProfile = async () => {
    const response = await axios.post("/api/user/profile", {
      userId: "123",
      newProfileData: profileData,
    });
    console.log(response.data);
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <input
        type="text"
        value={profileData.name}
        onChange={(e) =>
          setProfileData({ ...profileData, name: e.target.value })
        }
        placeholder="Name"
      />
      <input
        type="email"
        value={profileData.email}
        onChange={(e) =>
          setProfileData({ ...profileData, email: e.target.value })
        }
        placeholder="Email"
      />
      <button onClick={updateProfile}>Update</button>
    </div>
  );
};

export default UserProfile;
