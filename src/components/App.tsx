import React from 'react';
import { CookingSessionState } from "../redux/state/stateMap";
import { connect } from "react-redux";
import { RootState } from "../redux/rootReducer";
import { startRecipe } from "../redux/cookingSessionSlice"
import { cookies } from "../data/sampleRecipes";
import CookingActivityContainer from "./CookingActivity";

const App = ({ startMockRecipe }: { startMockRecipe: Function }) => {
  startMockRecipe();
  return (
    <CookingSession/>
  );
};

export default connect(null, dispatch => ({
  // populates the state with our mock recipe
  startMockRecipe: () => dispatch(startRecipe(cookies()))
}))(App);

const CookingSession = () => {
  return (
    <>
      <PrintedRecipeContainer/>
      <CookingActivityContainer/>
    </>
  )
};

const PrintedRecipe = ({ recipeInfo, instructions, ingredients }: CookingSessionState) => {
  return (
    <div>
      <h1>{ recipeInfo!.title }</h1>
      <ol>
        { instructions.map(({ text }) => <li key={ text }>{ text }</li>) }
      </ol>
      <ul>
        { ingredients.map(({ text }) => <li key={ text }>{ text }</li>) }
      </ul>
    </div>
  )
};

const PrintedRecipeContainer = connect(
  (state: RootState) => state.cookingSession
)(PrintedRecipe);
