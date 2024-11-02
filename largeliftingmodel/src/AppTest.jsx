import React from "react";
import { act } from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history'
import { render } from '@testing-library/react';

const history = createMemoryHistory({ initialEntries: ["/"] });

class AppTest {

  static render(ui, {...renderOptions } = {}) {
    return render(
        <Router location={history.location} navigator={history}>{ui}</Router>,
      renderOptions
    );
  }

  static #delayCore = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  static delay = async (ms=500) => {
    await act(async () => {
      await AppTest.#delayCore(ms)
    })
  }

  static changeState = async (changes) => {
    await act(async () => {
      changes()
      await AppTest.delay()
    })
  } 

  constructor() {
  }
}
export default AppTest;