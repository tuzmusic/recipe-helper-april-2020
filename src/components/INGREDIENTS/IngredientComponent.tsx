import { AppIngredient } from "../../redux/state/stateMap";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import styled from "@emotion/styled";

const IngredientElement = styled.p<{ isCurrent: boolean }>({
    transition: '0.3s',
  },
  ({ isCurrent }) => ({
    fontWeight: isCurrent ? 'bold' : 'normal',
    fontSize: isCurrent ? 22 : 14,
    opacity: isCurrent ? 1 : 0.6
  })
)

type Props = {
  ingredient: AppIngredient
  isCurrent: boolean
}
export const IngredientComponent = ({ ingredient, isCurrent }: Props) => {
  return <IngredientElement isCurrent={ isCurrent }>{ ingredient.text }</IngredientElement>
}

const IngredientContainer = ({ ingredient }: { ingredient: AppIngredient }) => {
  const isCurrent = useSelector((state: RootState) => ingredient.stepIndex === state.cookingSession.currentStepIndex)
  return <IngredientComponent ingredient={ ingredient } isCurrent={ isCurrent }/>
}

export default IngredientContainer
