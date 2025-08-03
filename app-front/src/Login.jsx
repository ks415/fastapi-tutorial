import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import "./Auth.css";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        const result = await login(formData.username, formData.password);
        if (!result.success) {
          setError(result.error);
        }
      } else {
        const result = await register(
          formData.username,
          formData.email,
          formData.password
        );
        if (result.success) {
          setIsLogin(true);
          setFormData({ username: "", email: "", password: "" });
          setError("");
          alert("登録が完了しました。ログインしてください。");
        } else {
          setError(result.error);
        }
      }
    } catch (error) {
      setError("予期しないエラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>{isLogin ? "ログイン" : "新規登録"}</h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">ユーザー名</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="email">メールアドレス</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="password">パスワード</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "処理中..." : isLogin ? "ログイン" : "登録"}
          </button>
        </form>

        <div className="auth-switch">
          {isLogin ? (
            <p>
              アカウントをお持ちでない方は{" "}
              <button
                type="button"
                className="link-button"
                onClick={() => setIsLogin(false)}
              >
                こちら
              </button>
            </p>
          ) : (
            <p>
              既にアカウントをお持ちの方は{" "}
              <button
                type="button"
                className="link-button"
                onClick={() => setIsLogin(true)}
              >
                こちら
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
