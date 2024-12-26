import { useState, useEffect, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";

function EachThread() {
  const [eachthread, setEachThread] = useState(null);
  const [postcomment, setPostCommemt] = useState("");
  const [error, setError] = useState(null);
  const { thread_id } = useParams();
  const location = useLocation();
  const title = location.state.title || "スレッド";

  const fetch_thread_content = async () => {
    try {
      const eachthread_api = await fetch(`https://railway.bulletinboard.techtrain.dev/threads/${thread_id}/posts`,
        { method: "GET" }
      );
      if (!eachthread_api.ok) {
        throw new Error("スレッドの取得に失敗しました");
      }
      const response = await eachthread_api.json();
      console.log(response);

      if (Array.isArray(response.posts)) {
        setEachThread(response);
      }
      else {
        console.error("response is not array");
      }
    }
    catch (err) {
      setError(err);
      console.error(err);
    }
  }

  // スレッドのコメント取得
  useEffect(() => {
    fetch_thread_content();
  }, [thread_id]);

  // コメント投稿
  const fetch_post_comment = async () => {
    try {
      const post_comment_api = await fetch(`https://railway.bulletinboard.techtrain.dev/threads/${thread_id}/posts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ post: postcomment })
        },
      );
      if (!post_comment_api.ok) {
        throw new Error("コメントの取得に失敗しました");
      };
      const response = await post_comment_api.json();
      console.log(response);
      setPostCommemt(response);
      fetch_thread_content();
      setPostCommemt("");
    }
    catch (err) {
      setError(err);
      console.error(err);
    }
  }

  if (!eachthread) {
    return <div>loading...</div>
  }
  if (error) {
    return <div>{error.message}</div>
  }


  return (
    <div className="wrapper each_thread_wrapper">
      <h2 className="thread_h2">{title}</h2>
      <ul className="each_post_ul">
        {eachthread.posts.map(each_post => {
          return (
            <li className="each_post_li" key={each_post.id}>
              {each_post.post}
            </li>
          )
        })}
      </ul>
      <div className="post_button_div">
        <label htmlFor="thread_post"></label>
        <textarea name="thread_post" id="thread_post" value={postcomment} placeholder="投稿内容" onChange={(e) => setPostCommemt(e.target.value)}></textarea>
        <button className="thread_button" onClick={fetch_post_comment}>投稿</button>
      </div>
    </div>
  )
}

export default EachThread;