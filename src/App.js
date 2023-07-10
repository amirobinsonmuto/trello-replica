import Navbar from "./components/NavBar";
import Board from "./components/Board";

function App() {
  return (
    <div className="h-screen overflow-y-hidden">
      <Navbar />
      <Board />;
    </div>
  );
}

export default App;
