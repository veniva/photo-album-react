import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAppDispatch } from './app/hooks';
import { fetchDataThunk } from './app/appSlice';
import Galleries from "./features/gallery/Galleries";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchDataThunk());
  }, []);
  
  return (
    <div className="App">
      <header>
        Gallery
      </header>
      <section>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Galleries />} />
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
