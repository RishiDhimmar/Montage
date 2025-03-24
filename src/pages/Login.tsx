import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Button from "../components/UiComponent/Button";
import InputBox from "../components/UiComponent/InputTextArea";
import useLoading from "../hooks/useLoading";

const Login = () => {
  const navigate = useNavigate();
  const {  startLoading, stopLoading } = useLoading();

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
          <InputBox label="Username or Email" type="text" placeholder="Enter your email" />
          </div>
          <div className="mt-4">
          <InputBox label="Password" type="password" placeholder="Enter your password" />
          </div>
          <div className="mt-4">
            <Button label="Sign In" variant="primary" onClick={() => navigate("/portfolio")} />
          </div>

          <div className="text-center mt-4">
            <a onClick={() => navigate("/forgot-password")} className=" cursor-pointer hover:underline">
              Trouble signing in?
            </a>
          </div>

          <div className="border-t border-gray-300 my-4"></div>

          <div className="mt-4">
            <Button label="Create an account" variant="secondary" onClick={handleSignupRedirect} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
