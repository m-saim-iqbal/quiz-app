import { BrowserRouter as Router, Route, Switch, Routes } from "react-router-dom"
import './App.css';
import Start from './components/Start';
import Easy from "./components/Easy";
import Medium from "./components/Medium"
import Hard from "./components/Hard"
import NotFound from "./components/NotFound";
import Timer from "./components/Timer";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/easy" element={<Easy />} />
        <Route path="/medium" element={<Medium />} />
        <Route path="/hard" element={<Hard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

function App() {

  // const [difficulty, setDifficulty] = React.useState('easy');

  // const handleDifficultySelect = (selectedDifficulty) => {
  //   setDifficulty(selectedDifficulty);
  // };

  // const router = createBrowserRouter(
  //   createRoutesFromElements(
  //     <Route path="/" element={<Start />}>
  //       <Route path="/easy" element={<Easy />} />
  //       <Route path="/medium" element={<Medium />} />
  //       <Route path="/hard" element={<Hard />} />
  //       <Route path="*" element={<NotFound />} />
  //     </Route>
  //   )
  // )

  return (
    <AppRouter />
    // <div className="App">
    //   {/* <Start difficulty={difficulty} onSelectDifficulty={handleDifficultySelect} /> */}
    // <Hard />
    // </div>
    // <Timer />
    // <RouterProvider router = {router} />
  );
}

export default App;
