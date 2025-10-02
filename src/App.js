import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import ShowEntities from "./components/ShowEntities";
import EditEntities from "./components/EditEntities";
import CreateEntities from "./components/CreateEntities";

function App() {
  return (
    <BrowserRouter>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<ShowEntities></ShowEntities>}> </Route>
          <Route path="/edit/:id" element={<EditEntities></EditEntities>}></Route>
          <Route path="/create" element={<CreateEntities></CreateEntities>}
          ></Route>
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
}

export default App;
