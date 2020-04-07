import React from 'react';
import { CookingSessionState } from "../redux/state/stateMap";
import { connect } from "react-redux";
import { RootState } from "../redux/rootReducer";
import CookingActivityContainer from "./CookingActivity";
import { SimpleBorderedContainer } from "./UtilityComponents";

const App = () => {
  return (
    <CookingSession/>
  );
};

export default App

const CookingSession = () => {
  return (
    <>
      <PrintedRecipeContainer/>
      <CookingActivityContainer/>
    </>
  )
};

const PrintedRecipe = ({ recipeInfo, instructions, ingredients, currentStepIndex }: CookingSessionState) => {
  return (
    <SimpleBorderedContainer>
      <h1>{ recipeInfo!.title }</h1>
      <ol>
        { instructions.map(({ text }, i) => <li
          style={ { fontWeight: i === currentStepIndex ? 'bold' : 'normal' } }
          key={ text }>{ text }</li>) }
      </ol>
      <ul>
        { ingredients.map(({ text }) => <li key={ text }>{ text }</li>) }
      </ul>
    </SimpleBorderedContainer>
  )
};

const PrintedRecipeContainer = connect(
  (state: RootState) => state.cookingSession
)(PrintedRecipe);
