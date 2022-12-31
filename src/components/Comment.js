const Comment = ({ comment }) => {
  const fillZero = (data) => {
    return data.toString().padStart(2, "0");
  };
  const createdAt = new Date(comment.createdAt);
  return (
    <p>
      {comment.text}
      <span>
        created At :{" "}
        {`${fillZero(createdAt.getFullYear())}-${fillZero(
          createdAt.getMonth()
        )}-${fillZero(createdAt.getDay())} ${fillZero(
          createdAt.getHours()
        )} : ${fillZero(createdAt.getMinutes())}`}
      </span>
    </p>
  );
};
export default Comment;
