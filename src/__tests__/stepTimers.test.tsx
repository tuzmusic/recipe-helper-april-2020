import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from "react-redux";
import store from "../redux/store";
import App from "../components/App"
import '@testing-library/jest-dom/extend-expect';

class TestableTimer {
  pendingTestId = `Pending timer button: ${ this.label }`
  activeTestId = `Running timer button: ${ this.label }`
  pendingQueryStr = `[data-testid="${ this.pendingTestId }"]`
  activeQueryStr = `[data-testid="${ this.activeTestId }"]`
  app = render(
    <Provider store={ store }>
      <App/>
    </Provider>
  )
  
  constructor(public label: string, public startTimeStr: string) {}
  
  get pendingContainer() { return this.app.queryByTestId('pending-timers-container')! }
  
  get activeContainer() { return this.app.queryByTestId('active-timers-container')! }
  
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
  
  shouldHaveCorrectText = () => {
    expect(this.activeQuery!.textContent).toEqual(this.startTimeStr)
  }
  
  start = () => this.app.queryByTestId(this.pendingTestId)!.click()
}

describe('step timers', () => {
  describe('starting a timer from an early step', () => {
    it('works', () => {
      const danceTimer = new TestableTimer('Dance', '1:00')
      danceTimer.shouldBePending()
      danceTimer.start()
      danceTimer.shouldBeActive()
      danceTimer.shouldHaveCorrectText()
    });
  });
});
