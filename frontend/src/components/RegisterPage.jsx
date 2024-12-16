import api from '../api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RegisterForm.css'; // Add CSS for styling

function RegisterForm() {
  const [name, setName] = useState("");
  const [nationality, setNationality] = useState("");
  const [age, setAge] = useState(18);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState(null);
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("phone", phone);
      formData.append("age", age);
      formData.append("address", address);
      formData.append("photo", photo);
      formData.append("nationality", nationality);

      await api
        .post("/vote/users/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(() => {
          navigate("/login");
        });
    } catch (error) {
      alert("An error occurred while registering. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="register-container">
        <div className="register-left">
          <h1>Register for Online Voting</h1>
          <p>
            Join the revolution of online voting! Your participation matters. 
            By registering, you take the first step toward ensuring your voice is heard in this democratic process.
          </p>
          <p>
            Online voting is fast, secure, and ensures fairness for everyone. 
            Let's build a transparent and inclusive electoral system together!
          </p>
        </div>
        <div className="register-right">
          <form className="form-container" onSubmit={handleRegister}>
            <h1>Sign Up Now</h1>
            <input
              type="text"
              className="form-input"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              className="form-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="number"
              className="form-input"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="number"
              className="form-input"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <input
              type="text"
              className="form-input"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <label htmlFor="profile-photo" className="form-label">
              Upload Profile Photo:
            </label>
            <input
              id="profile-photo"
              type="file"
              className="form-input"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
            />
            <input
              type="text"
              className="form-input"
              placeholder="Nationality"
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
            />
            <button className="form-button" type="submit" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
            <a href="/login" className="login-link">
              Already Registered? Login here.
            </a>
          </form>
        </div>
      </div>
    </>
  );
}

export default RegisterForm;
