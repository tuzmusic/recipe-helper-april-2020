export type RecipeInfo = {
  id: string
  title: string
};

export type AppRecipe = {
  info: RecipeInfo,
  instructions: AppInstruction[]
  ingredients: RecipeIngredient[]
  timers: AppStepTimer[]
}

export type AppInstruction = {
  text: string
}

export type RecipeIngredient = {
  name: string
  id: number
  state: IngredientState
  originalText: string
  amount: number
  unit: string // enum IngredientUnit | string
  stepIndices: number[]
}

export enum CookingTimerState {
  Pending,
  Paused,
  Running,
  Done
}

export type AppStepTimer = {
  label: string
  id: number
  state: CookingTimerState
  durationSec: number
  stepIndex: number
}


export type IngredientState = {
  done: boolean
}
