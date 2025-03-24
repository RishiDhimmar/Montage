import { useState } from "react";
import Button from "../components/UiComponent/Button"; // Custom Button Component
import InputBox from "../components/UiComponent/InputTextArea";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import SignupSidebar from "../components/SignupSidebar";

const Signup = () => {
  const [accountType, setAccountType] = useState<"individual" | "business">(
    "individual"
  );
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSignup = () => {
    console.log("User signed up!");
    navigate("/portfolio");
  };

  return (
    <>
      <div className="flex h-[100vh]">
        {/* Left Sidebar */}
        <SignupSidebar />

        {/* Right Signup Form */}
        <div className="flex-1 flex flex-col justify-center items-center bg-white ">
          <div className="w-full  max-w-md">
            <div className="text-2xl font-bold mb-6 text-gray-900">
              Create your account
            </div>

            {/* Account Type Selection */}
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

            {/* Form Inputs */}
            <div className="space-y-4">
              <InputBox
                label="Full name"
                type="text"
                placeholder="Enter your full name"
              />
              {accountType === "business" && (
                <InputBox
                  label="Organization"
                  type="text"
                  placeholder="Enter your organization name"
                />
              )}
              <InputBox
                label="Email"
                type="email"
                placeholder="Enter your email"
              />
              <InputBox
                label="User name"
                type="text"
                placeholder="Choose a username"
              />
              <InputBox
                label="Password"
                type="password"
                placeholder="Enter your password"
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

            {/* Signup Button */}
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
              <a href="/login" className="text-blue-600 underline">
                Log In
              </a>
            </div>
          </div>
        <div>
          <Footer />
        </div>
        </div>
      </div>

    </>
  );
};

export default Signup;
