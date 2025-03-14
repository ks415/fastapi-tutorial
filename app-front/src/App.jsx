import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const baseUrl = "http://localhost:8000";

  // タスク一覧を取得
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${baseUrl}/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // 初回読み込み時にタスク一覧を取得
  useEffect(() => {
    fetchTasks();
  }, []);

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
    }
  };

  // タスクを削除
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${baseUrl}/tasks/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="App">
      <h1>TODOリスト</h1>

      <div className="task-form">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="新しいタスクを入力してください"
          onKeyPress={(e) => e.key === "Enter" && createTask()}
        />
        <button onClick={createTask}>追加</button>
      </div>

      <div className="task-list">
        {tasks.length === 0 ? (
          <div className="task-item" style={{ justifyContent: "center" }}>
            タスクがありません。新しいタスクを追加してください！
          </div>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="task-item">
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleDone(task.id, task.done)}
              />
              <span className={task.done ? "done" : ""}>{task.title}</span>
              <button onClick={() => deleteTask(task.id)}>削除</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
