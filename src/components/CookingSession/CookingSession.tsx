import { CenterFlexColumn, CenterFlexRow } from "../UtilityComponents";
import { PrintedRecipeContainer } from "../RecipeSummary/RecipeSummary";
import CookingActivityContainer from "../CookingActivity/CookingActivity";
import React from "react";
import styled from "@emotion/styled";
import DoneTimersContainer from "../CurrentStep/DoneTimersContainer";

const SessionWrapper = styled(CenterFlexColumn)({
  width: '100%',
  alignItems: 'flex-start'
})
const PrintedWrapper = styled.div({
  width: '30%'
})
const ActivityWrapper = styled.div({
  width: '100%'
})

export const CookingSession = () =>
  <SessionWrapper>
    <CenterFlexRow style={ { alignItems: 'flex-start' } }>
      <PrintedWrapper>
        <PrintedRecipeContainer/>
      </PrintedWrapper>
      <ActivityWrapper>
        <CookingActivityContainer/>
      </ActivityWrapper>
    </CenterFlexRow>
    <DoneTimersContainer/>
  </SessionWrapper>
