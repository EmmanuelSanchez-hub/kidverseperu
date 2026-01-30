import { BrowserRouter, Route, Routes } from "react-router-dom";
import AgendarReunion from "@/pages/agender-reunion";
import Home from "@/pages/Home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agendar-reunion" element={<AgendarReunion />} />
      </Routes>
    </BrowserRouter>
  )
}