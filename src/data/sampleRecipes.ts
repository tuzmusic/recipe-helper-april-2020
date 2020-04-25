import { RecipeJSON } from "../redux/state/stateMap";

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
      text: "Preheat the oven to 375, while dancing for one minute",
      timers: [{
        label: "Dance",
        durationSec: 60,
      }],
      ingredients: []
    },
    {
      text: "Crack the egg",
      timers: [],
      ingredients: [
        { text: "1 egg" },
      ]
    },
    {
      text: "Mix flour, chips and sugar",
      timers: [],
      ingredients: [
        { text: "2 cups flour" },
        { text: "1 cup chips" },
        { text: "2 tbsp sugar" },
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
    { text: "2 cups flour" },
    { text: "1 cup chips" },
    { text: "2 tbsp sugar" },
    { text: "1 egg" },
  ]
}
