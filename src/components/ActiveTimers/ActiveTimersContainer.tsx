import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { clearTimer } from "../../redux/cookingSessionSlice";
import { ActiveTimers } from "./ActiveTimers";
import { getActiveTimers } from "../../redux/selectors/cookingSession.selectors";

const ActiveTimersContainer = () => {
  const dispatch = useDispatch()
  
  return <ActiveTimers
    timers={ useSelector((state: RootState) => getActiveTimers(state)) }
    clearTimer={ () => dispatch(clearTimer) }
  />
}

export default ActiveTimersContainer
