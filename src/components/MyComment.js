import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase";
import Style from "../styles/Comment.module.css";

const MyComment = ({ comment, userObj }) => {
  const [newComment, setNewComment] = useState("");
  const [edit, setEdit] = useState(false);
  const createdAt = new Date(comment.createdAt);

  const fillZero = (data) => {
    return data.toString().padStart(2, "0");
  };
  const onDelete = async () => {
    const q = window.confirm("한줄평을 삭제하시겠습니까?");
    if (q) {
      try {
        await deleteDoc(doc(db, "Users", userObj.uid, "Reviews", comment.id));
      } catch (error) {
        alert("알 수 없는 이유로 삭제가 되지 않았습니다.");
      }
    }
  };
  const toggleEdit = () => {
    setEdit((prev) => !prev);
    setNewComment(comment.text);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewComment(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(
      doc(db, "Users", userObj.uid, "Reviews", comment.id),
      "text",
      newComment
    );
    toggleEdit();
  };
  return (
    <div className={Style.commentBox}>
      <div className={Style.Name}>
        {comment.displayName + " : " + comment.movieTitle}
        {userObj.uid === comment.creator ? (
          <div className={Style.EditOrDelete}>
            <span onClick={toggleEdit}>{edit ? "취소" : "수정"}</span>/
            <span onClick={onDelete}>삭제</span>
          </div>
        ) : null}
      </div>
      <div className={Style.Text}>
        {edit ? (
          <form onSubmit={onSubmit}>
            <input type="text" onChange={onChange} value={newComment} />
            <button className={Style.EditButton}>수정하기</button>
          </form>
        ) : (
          comment.text
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
export default MyComment;
