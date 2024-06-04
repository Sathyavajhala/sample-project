import { Route, Routes } from "react-router-dom";
import "./App.css";
import BasicTable from "./components/Table/ReuseableTable";
import ErrorPage from "./components/Error/ErrorPage";

function App() {
  return (
    <div style={{ marginLeft: "6%", marginTop: "5%", width: "85%" }}>
      <Routes>
        <Route path="/" element={<BasicTable />} />
        <Route path="/errorpage" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
