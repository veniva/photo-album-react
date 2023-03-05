import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAppDispatch } from './app/hooks';
import Galleries from "./features/gallery/Galleries";
import Gallery from "./features/gallery/Gallery";
import { fetchDataThunk } from "./features/gallery/gallerySlice";
import "./App.css";

function App() {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState<string|JSX.Element>("");

  useEffect(() => {
    dispatch(fetchDataThunk());
  }, []);
  
  return (
    <div className="App">
      <BrowserRouter>
        <header>
          {title}
        </header>
        <section>
          
            <Routes>
              <Route path="/" element={<Galleries setPageTitle={setTitle} />} />
              <Route path="/gallery/:id" element={<Gallery setPageTitle={setTitle} />} />
            </Routes>
          
        </section>
        <footer>
          © {new Date().getFullYear()}
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
