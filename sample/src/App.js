import "./App.css";
import BasicTable from "./components/Table/ReuseableTable";

function App() {
  return (
    <div style={{ marginLeft: "6%", marginTop: "5%", width: "85%" }}>
      <h1 style={{ fontSize: "1.5rem" }}>Customer Information</h1>
      <BasicTable />;
    </div>
  );
}

export default App;
