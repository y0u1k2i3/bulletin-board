import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function CreateThread() {
  const [title, setTitle] = useState(""); // スレッド作成用のオブジェクト
  const [error, setError] = useState(null); // エラー用のオブジェクト
  const navigate = useNavigate(); // TOP画面に戻るフック

  // 新規スレッド作成
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
    if (error) {
      return <div>{error.message}</div>
    }
  };

  return (
    <div className="wrapper">
      <h2 className="thread_h2">新規スレッド作成</h2>
      <label htmlFor="title"></label>
      <input id="thread_title" type="text" placeholder="スレッドタイトル" onChange={(e) => setTitle(e.target.value)} />
      <div className="thread_button_div">
        <button className="thread_button" onClick={create_newthread}>作成</button>
        <Link to={"/"}>
          <p>TOPに戻る</p>
        </Link>
      </div>
    </div>
  )
}

export default CreateThread;