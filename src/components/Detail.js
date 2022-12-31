import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import Comment from "./Comment";

const Detail = ({ userObj }) => {
  const [movieDetail, setMovieDetail] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const { id } = useParams();

  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovieDetail(json.data.movie);
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setComment(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      if (comment !== "'") {
        await addDoc(collection(db, id), {
          creator: userObj.uid,
          createdAt: Date.now(),
          text: comment,
        });
        setComment("");
      }
    } catch (e) {
      alert("알 수 없는 이유로 등록 실패");
      console.error("Error adding document: ", e);
    }
  };

  const getComments = () => {
    const q = query(collection(db, id), orderBy("createdAt", "desc"));
    onSnapshot(q, (querySnapshot) => {
      const newComments = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setComments(newComments);
    });
  };

  useEffect(() => {
    getMovie();
    getComments();
  }, []);

  return (
    <>
      <div>
        {movieDetail ? (
          <>
            <img src={movieDetail.large_cover_image} alt="cover_image" />
            <div>
              <h1>{movieDetail.title}</h1>
              <p>{movieDetail.description_full}</p>
            </div>
          </>
        ) : (
          "Loading ..."
        )}
      </div>
      <div className="userComments">
        {userObj && (
          <>
            <form onSubmit={onSubmit}>
              <input
                onChange={onChange}
                value={comment}
                type="text"
                maxLength={300}
                placeholder="한줄평을 남겨주세요"
              />
              <button>추가</button>
            </form>
            <div>
              {comments.map((comment) => {
                return <Comment key={comment.id} comment={comment} />;
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Detail;
