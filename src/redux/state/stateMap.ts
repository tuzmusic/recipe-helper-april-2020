export type RecipeInfo = {
  id: string
  title: string
};

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
