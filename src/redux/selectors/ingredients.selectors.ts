import { RootState } from "../rootReducer";
import { RecipeIngredient } from "../state/stateMap";

export const getAllIngredients = (state: RootState): RecipeIngredient[] => state.cookingSession.ingredients;
