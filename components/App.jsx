import React from "react";

import DatePickerA from "./DatePickerA";
import DatePickerB from "./DatePickerB";

export default class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <DatePickerA />
        <DatePickerB />
      </React.Fragment>
    );
  }
}
