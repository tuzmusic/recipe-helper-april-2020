// exists immutably in the database, but is *copied* by value for every session
import { AppRecipe, IngredientJSON, IngredientState, RecipeInfo, RecipeJSON } from "../redux/state/stateMap";

export class Recipe {
  info: RecipeInfo = {
    id: "",
    title: ""
  };
  instructions: Instruction[] = [];
  ingredients: Ingredient[] = [];
  timers: StepTimer[] = [];
  
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
  
  static parseJson = (json: RecipeJSON): Recipe => {
    const recipe = new Recipe()
    recipe.info.title = json.title;
    
    // Our native API drives everything from the instructions
    json.instructions.forEach((inst, stepIndex) => {
      const instruction = new Instruction(inst.text)
      
      inst.timers.forEach(({ label, durationSec }) => {
        recipe.timers.push(new StepTimer(label, durationSec, stepIndex));
      })
      
      // todo: this orders ingredients by step, which could lead to duplicate
      //  ingredients. at the simplest, we should keep a list of all ingredients
      //  separate from their relationship to instructions.
      inst.ingredients.forEach(({ text }: IngredientJSON) => {
        recipe.ingredients.push(new Ingredient(text, stepIndex))
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

export class Ingredient {
  static id = 0;
  
  id: number;
  state: IngredientState = {
    done: false
  };
  
  constructor(public text: string,
    public stepIndex: number) {
    this.id = Ingredient.id++;
  }
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

export class StepTimer {
  static id = 0;
  
  timerId: number
  state: CookingTimerState = CookingTimerState.Pending
  
  constructor(public label: string, public durationSec: number,
    public stepIndex: number) {
    this.timerId = StepTimer.id++;
  }
}
