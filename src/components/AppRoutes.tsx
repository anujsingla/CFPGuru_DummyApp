import { Route, Routes } from "react-router-dom";
import { About } from "./About";
import { CfpForm } from "./CfpForm";
import { Home } from "./Home";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cfpform" element={<CfpForm />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}
