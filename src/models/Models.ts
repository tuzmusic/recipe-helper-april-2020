// exists immutably in the database, but is *copied* by value for every session
import { AppRecipe, AppStepTimer, CookingTimerState, RecipeIngredient } from "../redux/state/stateMap";
import { DetailedIngredientJSON, RecipeJSON } from "../types/parser.types";

export class Recipe {
  
  /**
   * Create a Recipe object where the ingredients and timers are mapped to their "parent" step.
   * Create the ingredient and timer arrays by looking through each
   * @param json
   */
  static createRecipeFromJson = (json: RecipeJSON): AppRecipe => {
    
    const recipe: AppRecipe = {
      info: { id: "", title: json.title },
      instructions: [], ingredients: [], timers: []
    }
    
    recipe.ingredients = json.ingredients.map(
      (currentJsonIngredient: DetailedIngredientJSON, ingIndex: number) => {
        
        // initialize the ingredient object
        const newIngredient: RecipeIngredient = {
          ...currentJsonIngredient,
          state: { done: false },
          stepIndices: []
        }
        
        // look through all instructions and see if this ingredient is included
        json.instructions.forEach((inst, stepIndex) => {
          
          // check if this instruction uses this ingredient
          const instObj = inst.ingredients.find(({ id }) => currentJsonIngredient.id === id);
          // if it does, store this instruction's index
          if (instObj) newIngredient.stepIndices.push(stepIndex)
          
          // the first time around, create the instruction objects
          // and their timers.
          if (ingIndex === 0) {
            // timers don't come with an id so we handle it ourselves
            let timerIndex = 0;
            
            // create and add the instruction
            recipe.instructions.push({ text: inst.text })
            
            // create the timer object for any timers for this step
            inst.timers.forEach(({ label, durationSec }) => {
              const newTimer = {
                id: timerIndex++,
                label, durationSec, stepIndex,
                state: CookingTimerState.Pending
              };
              recipe.timers.push(newTimer);
            })
            
            /*        // todo: handle ingredients that appear in more than one step!
                    inst.ingredients.forEach((ing: StepIngredientJSON) => {
                      
                      // Find the corresponding detailed ingredient from the recipe's ingredients list
                      const detailedIngredientFromList = json.ingredients.find(({ id }) => id === ing.id)
                      
                      // if we couldn't find it, log a warning (this should never happen, and if it
                      // does something is definitely wrong!)
                      if (!detailedIngredientFromList) {
                        return console.warn(`Found ${ ing.name } in step ${ stepIndex } but not in the master list!`);
                      }
                      
                      // initialize the new ingredient
                      const newIngredient: RecipeIngredient = {
                        ...detailedIngredientFromList, stepIndices: stepIndex, state: { done: false }
                      }
                      
                      // place the ingredient in our list, preserving the order of the original list!
                      const listIndex = json.ingredients.indexOf(detailedIngredientFromList);
                      recipe.ingredients[listIndex] = newIngredient;
                    })*/
            
          }
        })
        
        return newIngredient
      })
    
    return recipe
  }
  
}

export class Instruction {
  timers: AppStepTimer[] = [];
  
  constructor(public text: string) {}
  
  // todo: handle ingredients in an instruction.
  //  might actually be a selector.
  // ingredients: Ingredient[] = [];
}

export class FillerStep extends Instruction {
  constructor(public fillerIndex: number) {super('');}
}
