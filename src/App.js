import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./main/Home.jsx";
import Figure from "./main/Figure.tsx";
import Selection from "./main/Selection.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="selection/" element={<Selection />} />
          <Route path="figure/:n" element={<Figure />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
