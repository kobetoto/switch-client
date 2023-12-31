import { Routes, Route } from "react-router-dom";

import IsPrivate from "./components/Isprivate";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Homepage from "./components/Homepage";
import UserPage from "./components/UserPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AddItem from "./components/AddItem";
import JoinUs from "./components/JoinUs";
import Compliance from "./components/Compliance";
import Item from "./components/Item";
import EditProfil from "./components/EditProfil";
import Caroussel from "./components/Caroussel";
import ItemEdit from "./components/ItemEdit";
import SwitchItem from "./components/SwitchItem";

import "./css/App.css";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />

        <Route path="/items/:id" element={<Item />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/user"
          element={
            <IsPrivate>
              <UserPage />
            </IsPrivate>
          }
        />

        <Route
          path="/editProfil"
          element={
            <IsPrivate>
              <EditProfil />
            </IsPrivate>
          }
        />

        <Route
          path="/additem"
          element={
            <IsPrivate>
              <AddItem />
            </IsPrivate>
          }
        />
        <Route path="/joinus" element={<JoinUs />} />
        <Route path="/compliance" element={<Compliance />} />
        <Route path="/Caroussel" element={<Caroussel />} />
        <Route path="/itemEdit/:id" element={<ItemEdit />} />
        <Route path="/switchitem/:id" element={<SwitchItem />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
