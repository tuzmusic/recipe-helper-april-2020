import { RootState } from "../rootReducer";
import { AppIngredient } from "../state/stateMap";

export const getAllIngredients = (state: RootState): AppIngredient[] => state.cookingSession.ingredients;
