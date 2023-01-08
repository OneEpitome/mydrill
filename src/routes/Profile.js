import { updateProfile } from "firebase/auth";
import {
  collectionGroup,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import MyComment from "../components/MyComment";
import MyReservation from "../components/MyReservation";
import { auth, db } from "../firebase";

const Profile = ({ refreshUser, userObj }) => {
  const [nickname, setNickname] = useState(userObj.displayName);
  const [comments, setComments] = useState([]);
  const [reservations, setReservations] = useState([]);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNickname(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    await updateProfile(auth.currentUser, { displayName: nickname });
    refreshUser();
  };
  const getComments = () => {
    const q = query(
      collectionGroup(db, "Reviews"),
      orderBy("createdAt", "desc"),
      where("creator", "==", userObj.uid)
    ); // collectionGroup 으로 수정해야함
    onSnapshot(q, (querySnapshot) => {
      const newComments = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setComments(newComments);
    });
  };

  const getReservation = () => {
    const q = query(
      collectionGroup(db, "Reservation"),
      orderBy("createdAt", "desc"),
      where("creator", "==", userObj.uid)
    );
    onSnapshot(q, (querySnapshot) => {
      const newReservations = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setReservations(newReservations);
    });
  };

  useEffect(() => {
    getComments();
    getReservation();
  }, []);

  return (
    <>
      <form onSubmit={onSubmit}>
        <label htmlFor="nickname">내 별명 : </label>
        <input id="nickname" type="text" value={nickname} onChange={onChange} />
        <button>수정</button>
      </form>
      <div>
        <h2>나의 코멘트</h2>
        <div>
          {comments.map((comment) => {
            return (
              <MyComment key={comment.id} comment={comment} userObj={userObj} />
            );
          })}
        </div>
        <h2>나의 예약내역</h2>
        <div>
          {reservations.map((reseravtion) => {
            return (
              <MyReservation
                key={reseravtion.id}
                reservation={reseravtion}
                userObj={userObj}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Profile;
