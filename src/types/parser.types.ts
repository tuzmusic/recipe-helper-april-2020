export type RecipeJSON = {
  title: string
  instructions: InstructionJSON[]
  ingredients: DetailedIngredientJSON[]
}

export type StepIngredientJSON = {
  name: string
  id: number
}
export type InstructionJSON = {
  text: string
  ingredients: StepIngredientJSON[]
  timers: CookingTimerJSON[]
}

export type DetailedIngredientJSON = StepIngredientJSON & {
  originalText: string
  amount: number
  unit: string // enum IngredientUnit | string
  // todo Spoonacular has a "measures property" but I don't really think I need it.
  //  maybe when we add the scale recipe feature?
}

export type CookingTimerJSON = {
  durationSec: number
  label: string
}
