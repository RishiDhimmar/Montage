import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/UiComponent/Button";
import InputBox from "../components/UiComponent/InputTextArea";
import SignupSidebar from "../components/SignupSidebar";
import { registerUser } from "../services/auth";

const Signup = () => {
  const [accountType, setAccountType] = useState<"individual" | "business">(
    "individual"
  );
  const [fullName, setFullName] = useState<string>("");
  const [organization, setOrganization] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const userData = {
        fullName,
        organization,
        email,
        username,
        password,
        accountType,
      };

      const response = await registerUser(userData);
      localStorage.setItem("token", response.data.token);
      console.log("Signup successful:", response.data);
      navigate("/");
    } catch (err: unknown) {
      const error = err as {
        response?: { data?: { error?: string } };
        message?: string;
      };
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Signup failed. Please try again.";
      console.error("Signup failed:", errorMessage);
      alert(errorMessage);
    }
  };

  return (
    <div className="flex h-[100vh]">
      <SignupSidebar />
      <div className="flex-1 flex flex-col justify-center items-center bg-white">
        <div className="w-full max-w-md">
          <div className="text-2xl font-bold mb-6 text-gray-900">
            Create your account
          </div>

          <div className="flex flex-col mb-4 gap-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="accountType"
                value="individual"
                checked={accountType === "individual"}
                onChange={() => setAccountType("individual")}
                className="form-radio"
              />
              Individual
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="accountType"
                value="business"
                checked={accountType === "business"}
                onChange={() => setAccountType("business")}
                className="form-radio"
              />
              Business
            </label>
          </div>

          <div className="space-y-4">
            <InputBox
              label="Full name"
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFullName(e.target.value)
              }
            />
            {accountType === "business" && (
              <InputBox
                label="Organization"
                type="text"
                placeholder="Enter your organization name"
                value={organization}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setOrganization(e.target.value)
                }
              />
            )}
            <InputBox
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
            <InputBox
              label="User name"
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUsername(e.target.value)
              }
            />
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

          <div className="flex items-center gap-2 text-sm text-gray-700 mt-4">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
            />
            <span>
              I agree to the Montage{" "}
              <a href="#" className="text-blue-600 underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-600 underline">
                Privacy Policy
              </a>
              .
            </span>
          </div>

          <div className="mt-6">
            <Button
              label="Create Account"
              variant="primary"
              onClick={handleSignup}
              disabled={!isChecked}
            />
          </div>

          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <a href="/" className="text-blue-600 underline">
              Log In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
