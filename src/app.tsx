import { BrowserRouter, Route, Routes } from "react-router";
import "@/app.css";

import { Base } from "@/page/page.tsx";
import { CalculatorPage } from "./page/calculator/safety/page.tsx";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Base />} />
        <Route path="calculator">
          <Route path="safety" element={<CalculatorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
