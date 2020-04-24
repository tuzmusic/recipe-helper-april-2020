import { connect } from "react-redux";
import { RootState } from "../../../redux/rootReducer";
import { ActiveTimers } from "./ActiveTimers";
import { getActiveTimers } from "../../../redux/selectors/cookingSession.selectors";

const selectProps = () => (state: RootState) =>
  ({ timers: getActiveTimers(state) });

const ActiveTimersContainer = connect(selectProps)(ActiveTimers)

export default ActiveTimersContainer
