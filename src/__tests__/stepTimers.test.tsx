import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from "react-redux";
import store from "../redux/store";
import App from "../components/App"
import '@testing-library/jest-dom/extend-expect';

const startingApp = render(
  <Provider store={ store }>
    <App/>
  </Provider>
)

let app: typeof startingApp;

const initializeApp = () => app = startingApp

class TestableTimer {
  pendingTestId = `Pending timer button: ${ this.label }`
  activeTestId = `Running timer button: ${ this.label }`
  pendingQueryStr = `[data-testid="${ this.pendingTestId }"]`
  activeQueryStr = `[data-testid="${ this.activeTestId }"]`
  
  constructor(public label: string, public startTimeStr: string, public _app: typeof app = app) {}
  
  get pendingContainer() { return this._app.queryByTestId('pending-timers-container')! }
  
  get activeContainer() { return this._app.queryByTestId('active-timers-container')! }
  
  get pendingQuery() { return this.pendingContainer.querySelector(this.pendingQueryStr) }
  
  get activeQuery() { return this.activeContainer.querySelector(this.activeQueryStr) }
  
  shouldBePending = (bool = true) => {
    expect(this.pendingQuery)[bool ? 'toBeTruthy' : 'toBeFalsy']();
    expect(this.activeQuery)[!bool ? 'toBeTruthy' : 'toBeFalsy']();
  }
  
  shouldBeActive = (bool = true) => {
    expect(this.activeQuery)[bool ? 'toBeTruthy' : 'toBeFalsy']();
    expect(this.pendingQuery)[!bool ? 'toBeTruthy' : 'toBeFalsy']();
  }
  
  shouldHaveCorrectTextWhenActive = () => {
    expect(this.activeQuery!.textContent).toEqual(this.startTimeStr)
  }
  
  start = () => this._app.queryByTestId(this.pendingTestId)!.click()
}

describe('step timers', () => {
  const nextStep = () => app.getByTestId('down arrow').click()
  const prevStep = () => app.getByTestId('up arrow').click()
  it('works starting a timer from an early step', () => {
    initializeApp();
    const danceTimer = new TestableTimer('Dance', '1:00', app)
    danceTimer.shouldBePending()
    danceTimer.start()
    danceTimer.shouldBeActive()
    danceTimer.shouldHaveCorrectTextWhenActive()
  });
  
  it('works start a later timer', () => {
    initializeApp();
    
    [0, 1, 2].forEach(_ => nextStep()) // go to step 4
    const bakeTimer = new TestableTimer('Bake', '30:00', app)
    bakeTimer.shouldBePending()
    bakeTimer.start()
    bakeTimer.shouldBeActive()
    bakeTimer.shouldHaveCorrectTextWhenActive()
  });
});
