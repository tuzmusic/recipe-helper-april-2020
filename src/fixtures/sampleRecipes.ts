import { DetailedIngredientJSON, RecipeJSON } from "../types/parser.types";

export const cookies = () => {
  /*
    const recipe = new Recipe();
    recipe.info.title = "Cookies";
    recipe.ingredients = [
      "2 cups flour",
      "1 cup chips",
      "2 tbsp sugar",
      "1 egg"
    ].map(i => new Ingredient(i));
    
    const basicStep = new Instruction("Preheat the oven to 375, while dancing for one minute");
    basicStep.timers.push(new CookingTimer(10 * 60, "Dance"));
    
    const ingStep = new Instruction("Mix flour, chips and sugar");
    const timeStep = new Instruction("Bake for 30 minutes");
    const timer = new CookingTimer(30 * 60, "Bake");
    timeStep.timers.push(timer);
    
    recipe.instructions = [basicStep, ingStep, timeStep];
    return recipe
  */
};

export const manySteps = () => {
  /*
    const recipe = new Recipe();
    recipe.info.title = "Lots of steps"
    recipe.ingredients = cookies().ingredients;
    
    recipe.instructions = Array.from({ length: 10 }, (v, k) => new Instruction(`Step at index ${ k }`))
    return recipe
  */
}

export const cookiesJson: RecipeJSON = {
  title: "Cookies",
  instructions: [
    {
      text: "Preheat the oven to 375, while dancing for one minute. And get the eggs ready!",
      timers: [{
        label: "Dance",
        durationSec: 1,
      }],
      ingredients: [
        { name: "1 egg", id: 3 },
      ]
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
    {
      text: "Bake for 30 minutes",
      timers: [{
        label: "Bake",
        durationSec: 30 * 60
      }],
      ingredients: []
    },
  ],
  ingredients: [
    { name: "2 cups flour", id: 0 } as DetailedIngredientJSON,
    { name: "1 cup chips", id: 1 } as DetailedIngredientJSON,
    { name: "2 tbsp sugar", id: 2 } as DetailedIngredientJSON,
    { name: "1 egg", id: 3 } as DetailedIngredientJSON,
  ]
}
