import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Button from "../components/UiComponent/Button";
import InputBox from "../components/UiComponent/InputTextArea";
import useLoading from "../hooks/useLoading";
import { loginUser } from "../services/auth";

const Login = () => {
  const navigate = useNavigate();
  const { startLoading, stopLoading } = useLoading();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    startLoading();
    try {
      const response = await loginUser(email, password);
      localStorage.setItem("token", response.data.token);
      console.log("Login successful:", response.data);
      navigate("/portfolio");
    } catch (err: unknown) {
      const error = err as {
        response?: { data?: { error?: string } };
        message?: string;
      };
      console.error(
        "Login failed:",
        error.response?.data?.error || error.message
      );
      alert(error.response?.data?.error || "Login failed. Please try again.");
    } finally {
      stopLoading();
    }
  };

  const handleSignupRedirect = () => {
    startLoading();
    setTimeout(() => {
      stopLoading();
      navigate("/signup");
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-[calc(100vh-97px)]">
        <div className="w-[392px] bg-white rounded">
          <div className="text-2xl font-bold mb-4">Sign In</div>
          <div className="mt-4">
            <InputBox
              label="Username or Email"
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
          </div>
          <div className="mt-4">
            <InputBox
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
          </div>
          <div className="mt-4">
            <Button label="Sign In" variant="primary" onClick={handleLogin} />
          </div>

          <div className="text-center mt-4">
            <a
              onClick={() => navigate("/forgot-password")}
              className="cursor-pointer hover:underline"
            >
              Trouble signing in?
            </a>
          </div>

          <div className="border-t border-gray-300 my-4"></div>

          <div className="mt-4">
            <Button
              label="Create an account"
              variant="secondary"
              onClick={handleSignupRedirect}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
