import { connect } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { clearTimer } from "../../redux/cookingSessionSlice";
import { ActiveTimers } from "./ActiveTimers";

export const ActiveTimersContainer = connect(
  ({ cookingSession }: RootState) => ({ timers: cookingSession.activeTimers }),
  { clearTimer }
)(ActiveTimers);
