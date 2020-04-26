import { RecipeIngredient } from "../../redux/state/stateMap";
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
  ingredient: RecipeIngredient
  isCurrent: boolean
}
export const IngredientComponent = ({ ingredient, isCurrent }: Props) => {
  return <IngredientElement isCurrent={ isCurrent }>{ ingredient.name }</IngredientElement>
}

const IngredientContainer = ({ ingredient }: { ingredient: RecipeIngredient }) => {
  const isCurrent = useSelector((state: RootState) => ingredient.stepIndices.includes(state.cookingSession.currentStepIndex))
  return <IngredientComponent ingredient={ ingredient } isCurrent={ isCurrent }/>
}

export default IngredientContainer
