import React from 'react';
import { CookingSession } from "./CookingSession/CookingSession";
import { CenterFlexRow } from "./UtilityComponents";
import styled from "@emotion/styled";
import { connect } from "react-redux";
import { startRecipe } from '../redux/cookingSessionSlice';
import { cookies } from "../data/sampleRecipes";
import { RootState } from "../redux/rootReducer";

const AppWrapper = styled(CenterFlexRow)({})

class App extends React.Component<any> {
  componentDidMount = () => this.props.startRecipe(cookies());
  
  render() {
    return (
      <AppWrapper bordered>
        { this.props.hasRecipe && <CookingSession/> }
      </AppWrapper>
    );
  }
}

export default connect(
  (state: RootState) => ({ hasRecipe: !!state.cookingSession.recipeInfo }),
  { startRecipe }
)(App)

