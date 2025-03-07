import { useState } from "react";

import Button from "../components/UiComponent/Button"; // Custom Button Component
import InputBox from "../components/UiComponent/InputTextArea";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [accountType, setAccountType] = useState<"individual" | "business">("individual");
  const [isChecked, setIsChecked] = useState<boolean>(false); // Checkbox state
  const navigate = useNavigate

  const handleSignup = () => {
    console.log("User signed up!");
    navigate("/login");
  };

  return (
    <>
      <div className="flex">
        <div className="w-1/4 bg-blue-900 min-h-screen"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col w-1/2 border rounded border-gray-300 p-6">
          <div className="text-2xl font-bold mb-4">Create Your Account</div>

          <div className="flex flex-col my-4 gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="accountType"
                value="individual"
                checked={accountType === "individual"}
                onChange={() => setAccountType("individual")}
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
              />
              Business
            </label>
          </div>

          {/* Form Inputs */}
          {accountType === "individual" ? (
            <>
              <InputBox label="Full Name" type="text" placeholder="Enter your full name" />
              <InputBox label="Email" type="email" placeholder="Enter your email" />
              <InputBox label="Username" type="text" placeholder="Choose a username" />
              <InputBox label="Password" type="password" placeholder="Enter your password" />
            </>
          ) : (
            <>
              <InputBox label="Full Name" type="text" placeholder="Enter your full name" />
              <InputBox label="Organization" type="text" placeholder="Enter your organization name" />
              <InputBox label="Email" type="email" placeholder="Enter your email" />
              <InputBox label="Username" type="text" placeholder="Choose a username" />
              <InputBox label="Password" type="password" placeholder="Enter your password" />
            </>
          )}

          {/* Checkbox */}
          <label className="flex items-center gap-2 text-gray-700 mt-4">
            <input type="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
            I agree to the Montage Terms of Service and Privacy Policy
          </label>

          {/* Signup Button (Disabled if checkbox is not checked) */}
          <div className="mt-4">
            <Button label="Sign Up" variant="primary" onClick={handleSignup} disabled={!isChecked} />
          </div>

          {/* Already have an account? */}
          <div className="my-4 text-center">
            Already have an account?{" "}
            <a href="/login" className="text-blue-900 underline">
              Sign In
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
