
import "./App.css";
import ConfiguratorLayout from "./layouts/ConfiguratorLayout";

import Signup from "./pages/SignUp";

function App() {
  return (
    <>
      <ConfiguratorLayout />
      <div className="text-3xl">Hello world 1</div>
      <Signup />
    </>
  );
}

export default App;
