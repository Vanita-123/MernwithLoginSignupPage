import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function SignUp() {
  const [user, setUser] = useState({
    UserName: "",
    email: "",
    password: "",
    confirmpassword: "",
    phoneNumber: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (user.password !== user.confirmpassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const { UserName, email, password, phoneNumber } = user;
    const dataToSend = {
      name: UserName,
      email,
      password,
      confirmPassword: user.confirmpassword,
      phoneNumber
    };

    await axios.post("http://localhost:8000/users/signup", dataToSend);
    alert("Successfully signed up");
  } catch (error) {
    alert("Signup failed: " + (error.response?.data?.message || error.message));
  }
};
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center h-screen items-center">
        <div className="border-black p-20 bg-zinc-200">
          <h1 className="text-3xl mb-6">Signup Page</h1>
          <p className="mb-4">Create a new account</p>
          <div>
            <div className="mb-4">
              <input
                name="UserName"
                type="text"
                onChange={handleInput}
                placeholder="UserName"
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <input
                name="email"
                type="email"
                onChange={handleInput}
                placeholder="Email"
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <input
                name="password"
                type="password"
                onChange={handleInput}
                placeholder="Password"
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <input
                name="confirmpassword"
                type="password"
                onChange={handleInput}
                placeholder="Confirm Password"
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <input
                name="phoneNumber"
                type="tel"
                onChange={handleInput}
                placeholder="Phone Number"
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="justify-center flex">
              <button
                type="submit"
                className="mb-5 bg-blue-600 w-full text-xl border rounded-xl text-white p-2"
              >
                SignUp
              </button>
            </div>
          </div>
          <div>
            <p>
              Have an account?{" "}
              <Link to="/signin" className="text-blue-600 underline">
                SignIn
              </Link>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}

export default SignUp;
