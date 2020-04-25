// exists immutably in the database, but is *copied* by value for every session
import { AppRecipe, IngredientJSON, RecipeJSON } from "../redux/state/stateMap";

export class Recipe {
  
  static parseJsonToJson = (json: RecipeJSON): AppRecipe => {
    let timerIndex = 0;
    let ingredientIndex = 0;
    
    const recipe: AppRecipe = {
      info: { id: "", title: json.title },
      instructions: [], ingredients: [], timers: []
    }
    
    json.instructions.forEach((inst, stepIndex) => {
      const instruction = new Instruction(inst.text)
      
      inst.timers.forEach(({ label, durationSec }) => {
        recipe.timers.push({
          label, durationSec, stepIndex,
          id: timerIndex++,
          state: CookingTimerState.Pending
        });
      })
      
      // todo: this orders ingredients by step, which could lead to duplicate
      //  ingredients (and a differing order between printed recipe and parsed recipe.
      //  at the simplest, we should keep a list of all ingredients
      //  separate from their relationship to instructions.
      inst.ingredients.forEach(({ text }: IngredientJSON) => {
        recipe.ingredients.push({
          text, stepIndex, state: { done: false },
          id: ingredientIndex++
        })
      })
      
      recipe.instructions.push(instruction)
    })
    
    return recipe
  }
  
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

