import { connect } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import React from "react";
import { CookingSessionState } from "../../redux/cookingSessionSlice";
import IngredientComponent from "./IngredientComponent";

const IngredientsList = ({ ingredients }: CookingSessionState) =>
  <>
    { ingredients.map((ing, i) =>
      <IngredientComponent ingredient={ ing } key={ i }/>) }
  </>;

const IngredientsListContainer = connect((state: RootState) => state.cookingSession)(IngredientsList);

export default IngredientsListContainer
