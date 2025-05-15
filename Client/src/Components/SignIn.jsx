import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function SignIn() {
  const [userdata, setUserdata] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserdata({ ...userdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/users/login", userdata);
      alert(response.data.message);
      navigate("/homepage");
    } catch (error) {
      alert("Sign-in failed: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="flex justify-center h-screen items-center">
      <div className="border-black p-20 bg-zinc-200">
        <form onSubmit={handleSubmit}>
          <h1 className="text-3xl mb-6">Login Page</h1>
          <p className="text-xl mb-3">Sign in to your account</p>

          <div className="mb-4">
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="justify-center flex">
            <button
              type="submit"
              className="mb-5 bg-blue-600 w-full text-xl border rounded-xl text-white p-2"
            >
              Login
            </button>
          </div>

          <div className="text-center">
            <p>
              Don’t have an account?{" "}
              <Link to="/signup" className="text-blue-600 underline">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
