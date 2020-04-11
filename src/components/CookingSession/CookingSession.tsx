import { CenterFlexRow } from "../UtilityComponents";
import { PrintedRecipeContainer } from "../RecipeSummary/RecipeSummary";
import CookingActivityContainer from "../CookingActivity/CookingActivity";
import React from "react";
import styled from "@emotion/styled";

const SessionWrapper = styled(CenterFlexRow)({
  width: '100%',
  alignItems: 'flex-start'
})
const PrintedWrapper = styled.div({
  width: '30%'
})
const ActivityWrapper = styled.div({
  width: '100%'
})

export const CookingSession = () => {
  return (
    <SessionWrapper>
      <PrintedWrapper>
        <PrintedRecipeContainer/>
      </PrintedWrapper>
      <ActivityWrapper>
        <CookingActivityContainer/>
      </ActivityWrapper>
    </SessionWrapper>
  )
};
