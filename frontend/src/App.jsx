import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import InformacaoLivro from "./pages/informacaoLivro";

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/livro/:id" element={<InformacaoLivro />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;