import { CookingTimerState } from "../../models/Models";

export type RecipeInfo = {
  id: string
  title: string
};

export type AppRecipe = {
  info: RecipeInfo,
  instructions: AppInstruction[]
  ingredients: AppIngredient[]
  timers: AppStepTimer[]
}

export type AppInstruction = {
  text: string
}

export type AppIngredient = {
  text: string
  id: number
  state: IngredientState
  stepIndex: number
}

export type AppStepTimer = {
  label: string
  id: number
  state: CookingTimerState
  durationSec: number
  stepIndex: number
}

// exists immutably in the database, but is *copied* by value for every session
export type RecipeJSON = {
  title: string
  instructions: InstructionJSON[]
  ingredients: IngredientJSON[]
}

export type InstructionJSON = {
  text: string
  ingredients: IngredientJSON[]
  timers: CookingTimerJSON[]
}

export type IngredientState = {
  done: boolean
}

export type IngredientJSON = {
  text: string
  id?: number
  amount?: number
  unit?: string // enum IngredientUnit | string
  item?: string // the thing the ingredient actually is
}

export type CookingTimerJSON = {
  durationSec: number
  label: string
} // & TimerApiType
