import React from "react";
import { AuthContext } from "../auth/AuthProvider";
import { db } from "../firebase";
import { UserType } from "../type";
import "./Profile.css";

import { Card } from "./Card";

const Profile = () => {
  const { currentUser } = React.useContext(AuthContext);
  const [user, setUser] = React.useState<UserType | null>(null);

  React.useEffect(() => {
    if (currentUser !== null) {
      db.collection("users")
        .doc(currentUser.uid)
        .get()
        .then((doc) => {
          console.log(doc.data());

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
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);
  return (
    <div className="profile">
      <h1>{currentUser.displayName}</h1>
      <p className="star">★ Star {user?.staredList.length}</p>
      <h2>投稿したロードマップ</h2>
      <div className="home__cardContainer">
        {user?.createdRoadmaps.map((d, index) => (
          // @ts-ignore
          <Card data={d} key={index} />
        ))}
      </div>
      <h2>いいねしたロードマップ</h2>
      {user?.staredList.map((d, index) => (
        // @ts-ignore
        <Card data={d.roadmap} key={index} />
      ))}
    </div>
  );
};

export default Profile;
