import { MouseEvent } from "react";
import { CookingTimer } from "../models/Models";

export type ClickHandler = (event: MouseEvent) => void
export type TimerAction = (t: CookingTimer) => void;
