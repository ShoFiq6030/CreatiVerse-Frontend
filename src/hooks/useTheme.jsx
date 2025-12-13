import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContest";

export const useTheme = () => useContext(ThemeContext);
