import { connect } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import React from "react";
import styled from "@emotion/styled";
import { CookingSessionState } from "../../redux/cookingSessionSlice";

const TextWrapper = styled.div({
  padding: '10px'
})

const PrintedRecipe = ({ recipeInfo, ingredients }: CookingSessionState) =>
  <TextWrapper>
    <h1>{ recipeInfo!.title }</h1>
    { ingredients.map(({ text }) => <li key={ text }>{ text }</li>) }
  </TextWrapper>;

export const PrintedRecipeContainer = connect(
  (state: RootState) => state.cookingSession
)(PrintedRecipe);
