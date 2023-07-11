import Navbar from "./components/NavBar";
import SubNavBar from "./components/SubNavBar";
import Board from "./components/Board";

function App() {
  return (
    <div className="h-screen overflow-y-hidden">
      <Navbar />
      <SubNavBar />
      <Board />;
    </div>
  );
}

export default App;
