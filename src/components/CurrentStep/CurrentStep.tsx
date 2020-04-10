import React from 'react'
import { connect } from "react-redux";
import { Section } from "../UtilityComponents";
import StepTimersContainer from "./StepTimers";
import StepsCarouselContainer from "../StepsCarousel/StepsCarouselContainer";

const CurrentStep = () => {
  console.log('render CurrentStep')
  return (
    <Section>
      <h2>Current Step</h2>
      <StepsCarouselContainer/>
      <StepTimersContainer/>
    </Section>
  );
};

const CurrentStepContainer = connect()(CurrentStep);

export default CurrentStepContainer
