import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase";
import Style from "../styles/Comment.module.css";

const MyReservation = ({ reservation, userObj }) => {
  const [newReservation, setReservation] = useState("");
  const [edit, setEdit] = useState(false);
  const createdAt = new Date(reservation.createdAt);

  const fillZero = (data) => {
    return data.toString().padStart(2, "0");
  };
  const onDelete = async () => {
    const q = window.confirm("예약을 삭제하시겠습니까?");
    if (q) {
      try {
        await deleteDoc(
          doc(db, "Users", userObj.uid, "Reservation", reservation.id)
        );
      } catch (error) {
        alert("알 수 없는 이유로 삭제가 되지 않았습니다.");
      }
    }
  };
  const toggleEdit = () => {
    setEdit((prev) => !prev);
    setReservation(reservation.reservedSeat);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setReservation(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(
      doc(db, "Users", userObj.uid, "Reservation", reservation.id),
      "reservedSeat",
      newReservation
    );
    toggleEdit();
  };
  return (
    <div className={Style.commentBox}>
      <div className={Style.Name}>
        {reservation.displayName + " : " + reservation.movieTitle}
        {userObj.uid === reservation.creator ? (
          <div className={Style.EditOrDelete}>
            <span onClick={toggleEdit}>{edit ? "취소" : "수정"}</span>/
            <span onClick={onDelete}>삭제</span>
          </div>
        ) : null}
      </div>
      <div className={Style.Text}>
        {edit ? (
          <form onSubmit={onSubmit}>
            <input type="text" onChange={onChange} value={newReservation} />
            <button className={Style.EditButton}>수정하기</button>
          </form>
        ) : (
          reservation.reservedSeat
        )}
      </div>
      {edit ? null : (
        <div className={Style.Time}>
          {`${fillZero(createdAt.getFullYear())}-${fillZero(
            createdAt.getMonth()
          )}-${fillZero(createdAt.getDay())} ${fillZero(
            createdAt.getHours()
          )} : ${fillZero(createdAt.getMinutes())}`}
        </div>
      )}
    </div>
  );
};
export default MyReservation;
