// exists immutably in the database, but is *copied* by value for every session
import { IngredientState, RecipeInfo } from "../redux/state/stateMap";

export class Recipe {
  info: RecipeInfo = {
    id: "",
    title: ""
  };
  instructions: Instruction[] = [];
  ingredients: Ingredient[] = []
}

export class Instruction {
  timers: CookingTimer[] = [];
  
  constructor(public text: string) {}
  
  // todo: handle ingredients in an instruction.
  //  might actually be a selector.
  // ingredients: Ingredient[] = [];
}

export class FillerStep extends Instruction {
  constructor(public fillerIndex: number) {super('');}
}

export class Ingredient {
  id: string = "";
  state: IngredientState = {
    done: false
  };
  
  constructor(public text: string) {}
}

export enum CookingTimerState {
  Pending,
  Paused,
  Running,
  Done
}

export class CookingTimer {
  constructor(
    public durationSec = 0,
    public label = "") {}
} // & TimerApiType

export type StepTimer = {
  state: CookingTimerState
  durationSec: number
  label: string
  stepIndex: number
}
