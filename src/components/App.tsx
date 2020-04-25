import React from 'react';
import styled from "@emotion/styled";
import { connect } from "react-redux";
import { startRecipe } from '../redux/cookingSessionSlice';
import { cookiesJson } from "../data/sampleRecipes";
import { RootState } from "../redux/rootReducer";
import { setAutoFreeze } from 'immer';
import { RecipeJSON } from "../redux/state/stateMap";
import { CookingSession } from "./CookingSession/CookingSession";
import { CenterFlexColumn } from "./UtilityComponents";

setAutoFreeze(false);
const AppWrapper = styled(CenterFlexColumn)({ alignItems: 'flex-start' })

class App extends React.Component<{
  recipeName: string | undefined
  startRecipe: (r: RecipeJSON) => void
}> {
  componentDidMount = () => this.props.startRecipe(cookiesJson);
  
  render = () =>
    <AppWrapper margin>
      { this.props.recipeName &&
      <>
          <h1>{ this.props.recipeName }</h1>
          <CookingSession/>
      </>
      }
    </AppWrapper>;
}

export default connect(
  (state: RootState) => ({ recipeName: state.cookingSession.recipeInfo?.title }),
  { startRecipe }
)(App)

