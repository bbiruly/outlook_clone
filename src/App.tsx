import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/ui/Header";
import EmailDetails from "./pages/EmailDetails";
import { DataProvider } from "./context/ContextApi";

function App() {
  return (
    <DataProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details" element={<EmailDetails />} />
          {/* 404 Fallback */}
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;
