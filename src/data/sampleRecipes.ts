import { CookingTimer, Ingredient, Instruction, Recipe } from "../models/Models";

export const cookies = () => {
  const recipe = new Recipe();
  recipe.info.title = "Cookies";
  recipe.ingredients = [
    "2 cups flour",
    "1 cup chips",
    "2 tbsp sugar",
    "1 egg"
  ].map(i => new Ingredient(i));
  
  const basicStep = new Instruction("Preheat the oven to 375, while dancing for one minute");
  basicStep.timers.push(new CookingTimer(105, "Dance"));
  
  const ingStep = new Instruction("Mix flour, chips and sugar");
  const timeStep = new Instruction("Bake for 30 minutes");
  const timer = new CookingTimer(30 * 60, "Bake");
  timeStep.timers.push(timer);
  
  recipe.instructions = [basicStep, ingStep, timeStep];
  return recipe
};

export const manySteps = () => {
  const recipe = new Recipe();
  recipe.info.title = "Lots of steps"
  recipe.ingredients = cookies().ingredients;
  
  recipe.instructions = Array.from({ length: 10 }, (v, k) => new Instruction(`Step at index ${ k }`))
  return recipe
}
