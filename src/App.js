import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from "react-router-dom"
import './App.css';
import Start from './components/Start';
import Easy from "./components/Easy";
import Medium from "./components/Medium"
import Hard from "./components/Hard"

function App() {

  // const [difficulty, setDifficulty] = React.useState('easy');

  // const handleDifficultySelect = (selectedDifficulty) => {
  //   setDifficulty(selectedDifficulty);
  // };

  // const router = createBrowserRouter(
  //   createRoutesFromElements(
  //     <Route path="/" element={<RootLayout />}>
  //       <Route index element={<Home />} />
  //       <Route path="/easy" element={<Easy />} />
  //       <Route path="/medium" element={<Medium />} />
  //       <Route path="/hard" element={<Hard />} />
  //       <Route path="*" element={<NotFound />} />
  //     </Route>
  //   )
  // )

  return (
    <div className="App">
      {/* <Start difficulty={difficulty} onSelectDifficulty={handleDifficultySelect} /> */}
      <Easy />
    </div>
  );
}

export default App;
