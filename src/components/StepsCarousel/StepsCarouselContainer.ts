import { RootState } from "../../redux/rootReducer";
import { connect } from "react-redux";
import StepsCarousel from "./StepsCarousel";
import {
  getActualStepsToDisplay,
  getAtWhichIndexToDisplayTheCurrentStep,
  selectCurrentStepIndex
} from "../../redux/selectors/cookingSession.selectors";
import { decStep, incStep } from "../../redux/cookingSessionSlice";

const select = (state: RootState) => ({
  steps: getActualStepsToDisplay(state),
  currentStepIndex: selectCurrentStepIndex(state),
  indexAtWhichToDisplayCurrentStep: getAtWhichIndexToDisplayTheCurrentStep(state)
})

const actions = { decStep, incStep }

let StepsCarouselContainer = connect(select, actions)(StepsCarousel);
export default StepsCarouselContainer;
