import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function EachThread() {
  const [eachthread, setEachThread] = useState(null);
  const [error, setError] = useState(null);
  const { thread_id } = useParams();
  useEffect(() => {
    const fetch_thread_content = async () => {
      try {
        const eachthread_api = await fetch(`https://railway.bulletinboard.techtrain.dev/threads/${thread_id}/posts?offset=20`);
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
    fetch_thread_content();
  }, [thread_id]);

  if (!eachthread) {
    return <div>loading...</div>
  }
  if (error) {
    return <div>{error.message}</div>
  }


  return (
    <div>
      <h2>ThreadID: {eachthread.threadId}</h2>
      <ul className="thread_content_ul">
        {eachthread.posts.map(each_post => {
          return (
            <li className="thread_content_li" key={each_post.id}>
              {each_post.posts}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default EachThread;