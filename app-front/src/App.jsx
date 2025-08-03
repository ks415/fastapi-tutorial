import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import Login from "./Login";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const baseUrl = "http://localhost:8000";

  const { user, token, logout, loading } = useAuth();

  // 認証ヘッダーを含むaxiosのデフォルト設定
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  // タスク一覧を取得
  const fetchTasks = useCallback(async () => {
    try {
      const response = await axios.get(`${baseUrl}/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      if (error.response?.status === 401) {
        logout();
      }
    }
  }, [baseUrl, logout]);

  // 初回読み込み時にタスク一覧を取得
  useEffect(() => {
    if (user && token) {
      fetchTasks();
    }
  }, [user, token, fetchTasks]);

  // 新しいタスクを作成
  const createTask = async () => {
    if (!newTask.trim()) return;
    try {
      await axios.post(`${baseUrl}/tasks`, {
        title: newTask,
      });
      setNewTask("");
      fetchTasks();
    } catch (error) {
      console.error("Error creating task:", error);
      if (error.response?.status === 401) {
        logout();
      }
    }
  };

  // タスクを完了/未完了に切り替え
  const toggleDone = async (taskId, isDone) => {
    try {
      if (isDone) {
        await axios.delete(`${baseUrl}/tasks/${taskId}/done`);
      } else {
        await axios.put(`${baseUrl}/tasks/${taskId}/done`);
      }
      fetchTasks();
    } catch (error) {
      console.error("Error toggling done status:", error);
      if (error.response?.status === 401) {
        logout();
      }
    }
  };

  // タスクを削除
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${baseUrl}/tasks/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
      if (error.response?.status === 401) {
        logout();
      }
    }
  };

  // ローディング中の表示
  if (loading) {
    return (
      <div className="App">
        <div style={{ textAlign: "center", padding: "2rem" }}>
          読み込み中...
        </div>
      </div>
    );
  }

  // 未認証の場合はログイン画面を表示
  if (!user) {
    return <Login />;
  }

  return (
    <div className="App">
      <div className="header">
        <h1>TODOリスト</h1>
        <div className="user-info">
          <span>ようこそ、{user.username}さん</span>
          <button onClick={logout} className="logout-button">
            ログアウト
          </button>
        </div>
      </div>

      <div className="task-form">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="新しいタスクを入力してください"
          onKeyDown={(e) => e.key === "Enter" && createTask()}
          aria-label="新しいタスクの入力"
        />
        <button onClick={createTask} aria-label="タスクを追加">
          追加
        </button>
      </div>

      <div className="task-list" role="list">
        {tasks.length === 0 ? (
          <div className="task-item" style={{ justifyContent: "center" }}>
            タスクがありません。新しいタスクを追加してください！
          </div>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="task-item" role="listitem">
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleDone(task.id, task.done)}
                aria-label={`${task.title}を${
                  task.done ? "未完了" : "完了"
                }にする`}
              />
              <span className={task.done ? "done" : ""}>{task.title}</span>
              <button
                onClick={() => deleteTask(task.id)}
                aria-label={`${task.title}を削除`}
              >
                削除
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
