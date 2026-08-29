import { createRoot } from "react-dom/client";
import { DlrcApp } from "./components/dlrc/DlrcApp";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/dlrc.css";

createRoot(document.getElementById("root")).render(<DlrcApp />);
