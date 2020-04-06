import React, { MouseEvent, useState } from 'react'
import { CookingSessionState } from "../redux/state/stateMap";
import { connect } from "react-redux";
import { RootState } from "../redux/rootReducer";
import { CookingTimer, Instruction } from "../models/Models";
import { clearTimer, decStep, incStep, startTimer } from "../redux/cookingSessionSlice"
import styled from "@emotion/styled";
import Timer from 'react-compound-timer'

type ClickHandler = (event: MouseEvent) => void
const Section = styled.div({
  border: 'solid black thin',
  padding: 10,
  margin: 10,
  display: 'flex',
  flexDirection: 'column'
});
const RowSection = styled(Section)({
  flexDirection: 'row'
});

const CurrentStep = ({ step, startTimer }: { step: Instruction, startTimer: (t: CookingTimer) => void }) => {
  return (
    <Section>
      <h2>Current Step</h2>
      <p>{ step.text }</p>
      { step.timers.length > 0 && <div>
          <p>Timers:</p>
        { step.timers.map(timer =>
          <button onClick={ () => startTimer(timer) }>Start "{ timer.label }"</button>) }
      </div> }
    </Section>
  )
};

const CurrentStepContainer = connect(
  ({ cookingSession }: RootState) => ({
    step: cookingSession.instructions[cookingSession.currentStepIndex]
  }),
  { startTimer }
)
(CurrentStep);

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

const ActiveTimers = ({ timers, clearTimer }: { timers: CookingTimer[], clearTimer: (t: CookingTimer) => void }) => {
  const [timerDone, setDone] = useState(false);
  return <Section>
    <h3>Active Timers</h3>
    { !timers.length ? "No timers." : timers.map(timer =>
      <Timer
        direction="backward"
        initialTime={ timer.durationSec * 1000 }
        checkpoints={ [
          {
            time: 0,
            callback: () => setDone(true)
          }
        ] }
      >
        { ({ start, stop, reset }) =>
          <div style={ { display: 'flex' } }>
            { timer.label }:
            { timerDone ? "Done!" :
              <>
                <Timer.Minutes/>:
                <Timer.Seconds formatValue={ (v: number) => `${ v }`.padStart(2, "0") }/>
              </> }
            <button onClick={ start }>Start</button>
            <button onClick={ stop }>Stop</button>
            <button onClick={ reset }>Reset</button>
            <button onClick={ () => clearTimer(timer) }>Clear</button>
          </div>
        }
      </Timer>
    ) }
  </Section>
};

const ActiveTimersContainer = connect(
  ({ cookingSession }: RootState) => ({ timers: cookingSession.activeTimers }),
  { clearTimer }
)(ActiveTimers);

const CookingActivity = (props: CookingSessionState) => {
  return <div>
    <ActiveTimersContainer/>
    <StepControlsContainer/>
    <CurrentStepContainer/>
  </div>
};
const CookingActivityContainer = connect((state: RootState) => state.cookingSession)(CookingActivity);

export default CookingActivityContainer
