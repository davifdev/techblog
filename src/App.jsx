import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Components
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

// Pages
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { CreatePost } from "./pages/CreatePost";
import { PostUnique } from "./components/PostUnique";
import { Search } from "./pages/Search";
import { EditPost } from "./pages/EditPost";

// Hooks
import { AuthContextProvider } from "./context/useAuthContext";
import { useAuth } from "./hooks/useAuth";
import { useState, useEffect } from "react";

import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = useState();
  const { auth } = useAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  return (
    <AuthContextProvider value={{ user }}>
      <BrowserRouter>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/post/create"
              element={user ? <CreatePost /> : <Navigate to="/login" />}
            />
            <Route
              path="/post/:id"
              element={user ? <PostUnique /> : <Navigate to="/login" />}
            />
            <Route
              path="/search"
              element={user ? <Search /> : <Navigate to="/login" />}
            />
            <Route
              path="/dashboard"
              element={user ? <Dashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/posts/edit/:id"
              element={user ? <EditPost /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/register"
              element={!user ? <Register /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
