import { BrowserRouter, Route, Routes } from "react-router";

import { Base } from "@/page/page.tsx";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Base />} />
      </Routes>
    </BrowserRouter>
  );
}
