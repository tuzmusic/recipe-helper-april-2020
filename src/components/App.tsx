import React from 'react';
import styled from "@emotion/styled";
import { connect } from "react-redux";
import { startRecipe } from '../redux/cookingSessionSlice';
import { cookiesJson } from "../fixtures/sampleRecipes";
import { RootState } from "../redux/rootReducer";
import { setAutoFreeze } from 'immer';
import { CookingSession } from "./CookingSession/CookingSession";
import { CenterFlexColumn } from "./UtilityComponents";
import { RecipeJSON } from "../types/parser.types";

setAutoFreeze(false);
const AppWrapper = styled(CenterFlexColumn)({
  justifyContent: 'flex-start',
})

const Heading = styled.h1({
  padding: '10px',
  width: '100%'
})

class App extends React.Component<{
  recipeName: string | undefined
  startRecipe: (r: RecipeJSON) => void
}> {
  componentDidMount = () => this.props.startRecipe(cookiesJson);
  
  render = () =>
    <AppWrapper bordered fullHeight>
      { this.props.recipeName &&
      <>
          <Heading>{ this.props.recipeName }</Heading>
          <CookingSession/>
      </>
      }
    </AppWrapper>;
}

export default connect(
  (state: RootState) => ({ recipeName: state.cookingSession.recipeInfo?.title }),
  { startRecipe }
)(App)

