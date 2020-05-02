import { connect } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import React from "react";
import styled from "@emotion/styled";
import { CookingSessionState } from "../../redux/cookingSessionSlice";
import IngredientComponent from "./IngredientComponent";

const TextWrapper = styled.div({
  padding: '10px'
})

const IngredientsList = ({ ingredients }: CookingSessionState) =>
  <TextWrapper>
    { ingredients.map((ing, i) =>
      <IngredientComponent ingredient={ ing } key={ i }/>) }
  </TextWrapper>;

const IngredientsListContainer = connect((state: RootState) => state.cookingSession)(IngredientsList);

export default IngredientsListContainer
