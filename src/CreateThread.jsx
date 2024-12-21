import { useState, useEffect } from "react";
import ThreadList from "./ThreadList";
import { useNavigate } from "react-router-dom";

function CreateThread() {
  const [title, setTitle] = useState(""); // スレッド作成用のオブジェクト
  const [error, setError] = useState(null); // エラー用のオブジェクト
  const navigate = useNavigate(); // TOP画面に戻るフック

  const create_newthread = async () => {
    try {
      const newthread_api = await fetch("https://railway.bulletinboard.techtrain.dev/threads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      },
    );
    if (!newthread_api.ok) {
      throw new Error("スレッドの作成に失敗しました");
    }
    navigate("/");
    }
    catch (err) {
      setError(err);
      console.error(err);
    }
  };

  return (
    <div className="createthread_area">
      <h2 className="thread_h2">新規スレッド作成</h2>
      <label htmlFor="title"></label>
      <input id="title" type="text" placeholder="スレッドタイトル" onChange={(e) => setTitle(e.target.value)} />
      <div>
        <p>TOPに戻る</p>
        <button className="thread_button" onClick={create_newthread}>作成</button>
      </div>
    </div>
  )
}

export default CreateThread;