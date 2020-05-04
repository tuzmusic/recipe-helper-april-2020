import { DetailedIngredientJSON, RecipeJSON } from "../types/parser.types";

export const cookiesJson: RecipeJSON = {
  title: "Cookies",
  instructions: [
    {
      text: "Preheat the oven to 375, while dancing for one minute. And get the eggs ready!",
      timers: [{
        label: "Dance",
        durationSec: 5,
      }],
      ingredients: [
        { name: "1 egg", id: 3 },
      ]
    },
    {
      text: "Bake for 30 minutes",
      timers: [{
        label: "Bake",
        durationSec: 30 * 60
      }],
      ingredients: []
    },
    {
      text: "Crack the egg",
      timers: [],
      ingredients: [
        { name: "1 egg", id: 3 },
      ]
    },
    {
      text: "Mix flour, chips and sugar",
      timers: [],
      ingredients: [
        { name: "2 cups flour", id: 0 },
        { name: "1 cup chips", id: 1 },
        { name: "2 tbsp sugar", id: 2 },
      ]
    },
  ],
  ingredients: [
    { name: "2 cups flour", id: 0 } as DetailedIngredientJSON,
    { name: "1 cup chips", id: 1 } as DetailedIngredientJSON,
    { name: "2 tbsp sugar", id: 2 } as DetailedIngredientJSON,
    { name: "1 egg", id: 3 } as DetailedIngredientJSON,
  ]
}
