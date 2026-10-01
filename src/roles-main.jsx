import { createRoot } from "react-dom/client";
import { RoleArchiveApp } from "./components/roles/RoleArchiveApp";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/roles.css";

createRoot(document.getElementById("root")).render(<RoleArchiveApp />);
