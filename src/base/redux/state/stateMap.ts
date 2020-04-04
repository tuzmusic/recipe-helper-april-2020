export type Session = {
  recipe: Recipe
  activeTimers: CookingTimer[]
  currentStepId: number
}

// exists immutably in the database,
// but is copied by value for every session
export type Recipe = {
  instructions: Instruction[]
  ingredients: Ingredient[]
}

export type Instruction = {
  ingredients: Ingredient[]
  timers: CookingTimer[]
}

export type Ingredient = {
  text: string
  state: {
    done: boolean
  }
  id?: number
  amount?: number
  unit?: string // enum IngredientUnit | string
  item?: string // the thing the ingredient actually is
}

export type CookingTimer = {
  durationSec: number
  label: string
} // & TimerApiType
