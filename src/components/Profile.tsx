import React from "react";
import { AuthContext } from "../auth/AuthProvider";
import { db } from "../firebase";
import { UserType } from "../type";
import "./Profile.css";

const Profile = () => {
  const { currentUser } = React.useContext(AuthContext);
  const [user, setUser] = React.useState<UserType | null>(null);

  React.useEffect(() => {
    db.collection("users")
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        console.log(user);

        if (doc.exists) {
          setUser(doc.data() as UserType);
        } else {
          db.collection("users")
            .doc(currentUser.uid)
            .set({ createdRoadmaps: [], staredList: [] } as UserType)
            .catch((error) => alert("create userCollection error"));
        }
      })
      .catch((error) => alert("profile error"));
  }, [user, currentUser]);
  return <div></div>;
};

export default Profile;
