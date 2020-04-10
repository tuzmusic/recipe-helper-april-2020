import { connect } from "react-redux";
import { decStep, incStep } from "../../redux/cookingSessionSlice";
import { RowSection } from "../UtilityComponents";
import React from "react";
import { ClickHandler } from "../../types/utility.types";

const StepControls = ({ incStep, decStep }: { incStep: ClickHandler, decStep: ClickHandler }) => {
  return (
    <RowSection>
      <button onClick={ decStep }>{ "<<" }</button>
      { " " }
      <button onClick={ incStep }>{ ">>" }</button>
    </RowSection>
  )
};
const StepControlsContainer = connect(null, { decStep, incStep })(StepControls);

export default StepControlsContainer;

