import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/landing/video/LandingPage";
import VideoPage from "./components/landing/video/VideoPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/video" element={<VideoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
