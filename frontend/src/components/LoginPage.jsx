import '../styles/BasicForm.css';
import { useState } from 'react';
import api from '../api';
import { REFRESH_TOKEN, ACCESS_TOKEN } from '../constants';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await api.post('/vote/token/', { email, password });

      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
      navigate('/');
    } catch (error) {
      alert("Invalid credentials or error occurred!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="left-panel">
          <h1>Welcome to the Online Voting Platform</h1>
          <p>
            Make your voice heard with the power of online voting! 
            This secure and user-friendly system allows you to cast your vote anytime, anywhere, ensuring a fair and transparent election process.
          </p>
          <p>
            **Why Vote?** Voting empowers change. It's your chance to decide the leaders who shape policies that impact our future.
          </p>
          <p>
            Be a part of democracy. Take the first step by logging in below.
          </p>
        </div>
        <div className="right-panel">
          <form className="form-container" onSubmit={handleLogin}>
            <h1>Login to Vote</h1>
            <input
              type="email"
              className="form-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter your password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="form-button" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
            <a href="/register" className="register-link">Not registered yet? Register here</a>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
