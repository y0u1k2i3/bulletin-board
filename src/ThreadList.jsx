import { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom'

function ThreadList() {
  const [threadlist, setThreadList] = useState([]);
  const [error, setError] = useState(null);

  // スレッド一覧取得
  useEffect(() => {
    const fetch_thread = async () => {
      try {
        const threadlist_api = await fetch("https://railway.bulletinboard.techtrain.dev/threads", { method: "GET" });
        if (!threadlist_api.ok) {
          throw new Error("スレッド一覧の取得に失敗しました");
        }
        const response = await threadlist_api.json();
        console.log(response);
        setThreadList(response);
      }
      catch (err) {
        setError(err);
        console.error(err);
      }
    };
    fetch_thread();
    if (error) {
      return <div>{error.message}</div>
    }
  }, [])

  return (
    <div className="wrapper">
      <section className="thread_header">
        <h2 className="thread_h2">新着スレッド</h2>
        <Link to="/thread/new" className="thread_button_link">
          <button className="thread_button">スレ作成</button>
        </Link>
      </section>
      <ul className="thread_ul">
        {threadlist.map(thread => {
          return (
            <li className="thread_li" key={thread.id}>
              <Link to={`/threads/${thread.id}`} state={{ title: thread.title}}>
                {thread.title}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  );
}

export default ThreadList;