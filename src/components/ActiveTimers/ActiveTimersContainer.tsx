import { connect } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { clearTimer } from "../../redux/cookingSessionSlice";
import { ActiveTimers } from "./ActiveTimers";
import { getActiveTimers } from "../../redux/selectors/cookingSession.selectors";

export const ActiveTimersContainer = connect(
  (state: RootState) => ({ timers: getActiveTimers(state) }),
  { clearTimer }
)(ActiveTimers);
