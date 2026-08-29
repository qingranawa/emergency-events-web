import { createRoot } from "react-dom/client";
import { FactionsApp } from "./components/factions/FactionsApp";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/factions.css";

createRoot(document.getElementById("root")).render(<FactionsApp />);
