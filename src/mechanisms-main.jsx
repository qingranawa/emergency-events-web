import { createRoot } from "react-dom/client";
import { MechanismsApp } from "./components/mechanisms/MechanismsApp";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/mechanisms.css";

createRoot(document.getElementById("root")).render(<MechanismsApp />);
