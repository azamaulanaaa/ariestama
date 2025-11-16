import { BrowserRouter, Route, Routes } from "react-router";
import "@/app.css";

import { CalculatorPage } from "./page/calculator/safety/mod.tsx";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="calculator">
          <Route path="safety" element={<CalculatorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
