import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import Style from "../styles/Comment.module.css";

const Comment = ({ comment, userObj, id }) => {
  const createdAt = new Date(comment.createdAt);

  const fillZero = (data) => {
    return data.toString().padStart(2, "0");
  };
  const onDelete = async () => {
    const q = window.confirm("한줄평을 삭제하시겠습니까?");
    if (q) {
      try {
        await deleteDoc(doc(db, id, comment.id));
        alert("한줄평이 삭제되었습니다.");
      } catch (error) {
        alert("알 수 없는 이유로 삭제가 되지 않았습니다.");
      }
    }
  };

  return (
    <div className={Style.commentBox}>
      <div className={Style.Name}>
        {comment.displayName}
        {userObj.uid === comment.creator ? (
          <div className={Style.EditOrDelete}>
            <span>수정</span>/<span onClick={onDelete}>삭제</span>
          </div>
        ) : null}
      </div>
      <div className={Style.Text}>{comment.text}</div>
      <div className={Style.Time}>
        {`${fillZero(createdAt.getFullYear())}-${fillZero(
          createdAt.getMonth()
        )}-${fillZero(createdAt.getDay())} ${fillZero(
          createdAt.getHours()
        )} : ${fillZero(createdAt.getMinutes())}`}
      </div>
    </div>
  );
};
export default Comment;
