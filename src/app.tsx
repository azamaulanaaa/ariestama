import { BrowserRouter, Route, Routes } from "react-router";
import "@/app.css";

import { CalculatorPage } from "./page/calculator/mod.tsx";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="calculator" element={<CalculatorPage />} />
      </Routes>
    </BrowserRouter>
  );
}
