import { BrowserRouter } from "react-router-dom";
import { RouterApp } from "./routers";
import { NavBar } from "./components";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <RouterApp />
    </BrowserRouter>
  )
}
export default App;
