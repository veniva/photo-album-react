import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAppDispatch, useAppSelector } from './app/hooks';
import Galleries from "./features/gallery/Galleries";
import { fetchDataThunk } from "./features/gallery/gallerySlice";
import Gallery from "./features/gallery/Gallery";

function App() {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    dispatch(fetchDataThunk());
  }, []);
  
  return (
    <div className="App">
      <header>
        {title}
      </header>
      <section>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Galleries setPageTitle={setTitle} />} />
            <Route path="/gallery/:id" element={<Gallery setPageTitle={setTitle} />} />
          </Routes>
        </BrowserRouter>
      </section>
      <footer>
        © {new Date().getFullYear()}
      </footer>
    </div>
  );
}

export default App;
