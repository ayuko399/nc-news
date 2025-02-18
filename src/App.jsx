import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ArticlePage from "./pages/ArticlePage";
import { UserProvider } from "./contexts/UserContext";

import "./App.css";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
     <UserProvider>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/articles/:article_id" element={<ArticlePage />} />
        </Routes>
      </div>
     </UserProvider>
    </BrowserRouter>
  );
}

export default App;
