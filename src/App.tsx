import { BrowserRouter, Route, Routes } from "react-router-dom";
import AgendarReunion from "@/pages/agender-reunion";
import Home from "@/pages/Home";
import Panel from "@/pages/panel";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agendar-reunion" element={<AgendarReunion />} />
        <Route path="/panel" element={<Panel />} />
      </Routes>
    </BrowserRouter>
  )
}