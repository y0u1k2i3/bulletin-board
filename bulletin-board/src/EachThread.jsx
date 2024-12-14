import { useState, useEffect } from "react";
import ThreadList from "./ThreadList";

function EachThread() {
  const [eachthread, setEachThread] = useState([]);
  const [error, setError] = useState(null);
  const eachthread_api = await fetch("https://railway.bulletinboard.techtrain.dev/threads/{threadId}/posts")

  return (
    <div>
      <h2 className="thread_h2">スレッド詳細画面</h2>
    </div>
  )
}

export default EachThread;