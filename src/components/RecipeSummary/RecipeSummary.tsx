import { connect } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { CookingSessionState } from "../../redux/state/stateMap";
import React from "react";
import styled from "@emotion/styled";

const TextWrapper = styled.div({
  padding: '10px'
})

const PrintedRecipe = ({ recipeInfo, ingredients }: CookingSessionState) => {
  return (
    <TextWrapper>
      <h1>{ recipeInfo!.title }</h1>
      { ingredients.map(({ text }) => <li key={ text }>{ text }</li>) }
    </TextWrapper>
  )
};

export const PrintedRecipeContainer = connect(
  (state: RootState) => state.cookingSession
)(PrintedRecipe);
