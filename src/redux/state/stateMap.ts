import { CookingTimer, Ingredient, Instruction } from "../../models/Models";

interface CookingAPI {
  startRecipe(r: Recipe): void // copies info, instr, ings, from recipe to session
  
  incStep(): void
  
  decStep(): void
  
  goToStep(step: number): void
  
  // also convenience methods to toggle specific states
  toggleIngredientState(i: _Ingredient, stateKey: string): void
  
  // adds (not copies) an instruction's timer to Session.activeTimers and starts the timer
  startTimer(t: _CookingTimer): void
  
  // stops the timer (or shuts off the beeping?)
  stopTimer(t: _CookingTimer): void
  
  // stops the timer (if it's still going) and removes it from activeTimers
  clearTimer(t: _CookingTimer): void
}

// reducer
export type CookingSessionState = {
  recipeInfo: RecipeInfo | null
  instructions: Instruction[]
  ingredients: Ingredient[]
  activeTimers: CookingTimer[]
  currentStepId: number
}

export type RecipeInfo = {
  id: string
  title: string
};

// exists immutably in the database, but is *copied* by value for every session
type Recipe = {
  info: RecipeInfo
  instructions: _Instruction[]
  ingredients: _Ingredient[]
}

type _Instruction = {
  ingredients: _Ingredient[]
  timers: _CookingTimer[]
}

export type IngredientState = {
  done: boolean
}

type _Ingredient = {
  text: string
  state: IngredientState
  id?: number
  amount?: number
  unit?: string // enum IngredientUnit | string
  item?: string // the thing the ingredient actually is
}

type _CookingTimer = {
  durationSec: number
  label: string
} // & TimerApiType
