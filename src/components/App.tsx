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
import { recipeTitleAreaStyle } from "../style/styles";

setAutoFreeze(false);
const AppWrapper = styled(CenterFlexColumn)({
  justifyContent: 'flex-start',
  // paddingLeft: 10,
  // paddingRight: 10
})

const Heading = styled.div({
  ...recipeTitleAreaStyle,
  fontSize: '32px',
  fontWeight: 'bold',
  padding: '10px',
  width: '100%',
})

class App extends React.Component<{
  recipeName: string | undefined
  startRecipe: (r: RecipeJSON) => void
}> {
  componentDidMount = () => this.props.startRecipe(cookiesJson);
  
  render = () =>
    <AppWrapper
      fullHeig ht
      fullWidth
    >
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

