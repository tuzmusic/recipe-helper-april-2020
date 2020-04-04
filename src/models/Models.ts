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
  ingredients: Ingredient[] = [];
  timers: CookingTimer[] = []
}

export class Ingredient {
  text: string = "";
  id: string = "";
  state: IngredientState = {
    done: false
  };
}

export class CookingTimer {
  durationSec: number = 0;
  label: string = ""
} // & TimerApiType
