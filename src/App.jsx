import { BrowserRouter, Routes, Route } from "react-router-dom";
import ArticlePage from "./pages/ArticlePage";
import { UserProvider } from "./contexts/UserContext";

import "./App.css";
import Header from "./components/Header";
import TopicsPage from "./pages/TopicsPage";
import ArticlesPage from "./pages/ArticlesPage";

function App() {
  return (
    <BrowserRouter>
     <UserProvider>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<ArticlesPage />} />
          <Route path="/articles/:article_id" element={<ArticlePage />} />
          <Route path="/topics" element={<TopicsPage />} />
          <Route path="/topics/:topic_slug" element={<ArticlesPage/>} />
        </Routes>
      </div>
     </UserProvider>
    </BrowserRouter>
  );
}

export default App;
