import { CenterFlexColumn, CenterFlexRow } from "../UtilityComponents";
import IngredientsListContainer from "../INGREDIENTS/IngredientsList";
import React from "react";
import styled from "@emotion/styled";
import DoneTimersContainer from "../TIMERS/DoneTimers/DoneTimersContainer";
import StepTimersContainer from "../TIMERS/StepTimers/StepTimersContainer";
import ActiveTimersContainer from "../TIMERS/ActiveTimers/ActiveTimersContainer";
import StepsCarouselContainer from "../INSTRUCTIONS/StepsCarousel/StepsCarouselContainer";
import { carouselStyle, cookingSessionMainAreaStyle, ingredientsAreaStyle, timersAreaStyle } from "../../style/styles";

const IngredientsWrapper = styled.div({
  ...ingredientsAreaStyle,
  width: '30%'
})

const CurrentStepWrapper = styled.div({
  ...carouselStyle,
  width: '100%'
})

const TimersWrapper = styled(CenterFlexRow)({
  ...timersAreaStyle,
  width: '100%',
  height: '100%',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
})

let fullWidth_alignStart = {
  width: '100%',
  alignItems: 'flex-start'
};

const SessionWrapper = styled(CenterFlexColumn)(fullWidth_alignStart)
const MainSection = styled(CenterFlexRow)({
  ...cookingSessionMainAreaStyle,
  ...fullWidth_alignStart,
})

export const CookingSession = () =>
  <SessionWrapper>
    <MainSection>
      
      <IngredientsWrapper>
        <IngredientsListContainer/>
      </IngredientsWrapper>
      
      <CenterFlexColumn fullWidth>
        <CurrentStepWrapper>
          <StepsCarouselContainer/>
        </CurrentStepWrapper>
  
        <TimersWrapper>
          <StepTimersContainer/>
          <ActiveTimersContainer/>
        </TimersWrapper>
      </CenterFlexColumn>
    
    </MainSection>
    
    <DoneTimersContainer/>
  
  </SessionWrapper>
