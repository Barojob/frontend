import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* 로그인 페이지 */}
        <Route
          path="/login"
          element={
            <div className="flex min-h-screen justify-center items-center">
              <LoginPage />
            </div>
          }
        />
        {/* 회원가입 페이지 */}
        <Route
          path="/signup"
          element={
            <div className="flex min-h-screen justify-center items-center">
              <SignupPage />
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
