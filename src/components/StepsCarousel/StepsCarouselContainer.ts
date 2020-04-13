import { RootState } from "../../redux/rootReducer";
import { connect } from "react-redux";
import StepsCarousel from "./StepsCarousel";
import {
  getActualStepsToDisplay,
  getAtWhichIndexToDisplayTheCurrentStep,
  getDisplayedIndexForStep,
  getIndexForStep,
  getShouldShowStep,
  selectCurrentStepIndex
} from "../../redux/selectors/cookingSession.selectors";
import { decStep, incStep } from "../../redux/cookingSessionSlice";
import { FillerStep } from "../../models/Models";

const select = (state: RootState) => {
  
  let props = {
    steps: getActualStepsToDisplay(state),
    currentStepIndex: selectCurrentStepIndex(state),
    indexAtWhichToDisplayCurrentStep: getAtWhichIndexToDisplayTheCurrentStep(state)
  };
  // console.table(props.steps)
  console.table(
    props.steps.map(step => ({
      currentIndex: selectCurrentStepIndex(state),
      currentness: getShouldShowStep(step)(state),
      recipeIndex: getIndexForStep(step)(state),
      displayIndex: getDisplayedIndexForStep(step)(state),
      isFiller: step instanceof FillerStep,
      fillerIndex: (step as FillerStep)?.fillerIndex
    }))
  )
  return props;
}

const actions = { decStep, incStep }

let StepsCarouselContainer = connect(select, actions)(StepsCarousel);
export default StepsCarouselContainer;
