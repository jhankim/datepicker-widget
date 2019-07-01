import React from "react";
import "react-dates/initialize";
import {
  DateRangePicker,
  SingleDatePicker,
  DayPickerRangeController
} from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import moment from "moment";

export default class DatePickerA extends React.Component {
  constructor() {
    super();

    this.state = {
      startDate: moment(),
      endDate: moment().add(1, "week"),
      numberOfAdults: 2,
      numberOfChildren: 0,
      focusedInput: null
    };
  }

  renderCalendarInfo() {
    return (
      <p className="calendar-info">
        ❕ Please search your vacation dates from Saturday – Saturday. We do
        have a 3-night minimum, call our office for availability! 😊
      </p>
    );
  }

  onPersonnelChange(e) {
    const stateProp = e.currentTarget.name;
    const value = e.currentTarget.value;
    this.setState(() => ({
      [stateProp]: value
    }));
  }

  checkAvailability() {
    // format: ?pAdults=1&pChildren=0&pDateStart=07%2f06%2f19&pDateEnd=07%2f13%2f19
    const dateStart = this.state.startDate.format("MM/DD/YY");
    const dateEnd = this.state.endDate.format("MM/DD/YY");
    const { numberOfAdults, numberOfChildren } = this.state;

    const innroadLink = `http://clients.innroad.com/gulfside/logon.aspx?adults=${numberOfAdults}&children=${numberOfChildren}&dateStart=${dateStart}&dateEnd=${dateEnd}&propertyID=1564&promoCode=&pAdults=${numberOfAdults}&pChildren=${numberOfChildren}&pDateStart=${dateStart}&pDateEnd=${dateEnd}`;
    window.location.href = innroadLink;
  }

  render() {
    return (
      <React.Fragment>
        <h1>Version A</h1>
        <p>
          The following date picker allows the user to only select 7 day
          intervals
        </p>

        <p>
          <strong>Select your check-in date:</strong>
        </p>
        <DateRangePicker
          startDate={this.state.startDate} // momentPropTypes.momentObj or null,
          startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
          endDate={this.state.endDate} // momentPropTypes.momentObj or null,
          endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
          onDatesChange={({ startDate, endDate }) =>
            this.setState({ startDate, endDate })
          } // PropTypes.func.isRequired,
          focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
          endDateOffset={day => {
            return day.add(7, "days");
          }}
          renderCalendarInfo={this.renderCalendarInfo}
          hideKeyboardShortcutsPanel
        />

        <ul className="dropdown-list">
          <li>
            <label htmlFor="numberOfAdults">Adults:</label>
            <select
              name="numberOfAdults"
              value={this.state.numberOfAdults}
              onChange={e => {
                this.onPersonnelChange(e);
              }}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </li>
          <li>
            <label htmlFor="numberOfChildren">Children:</label>
            <select
              name="numberOfChildren"
              value={this.state.numberOfChildren}
              onChange={e => {
                this.onPersonnelChange(e);
              }}
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>{" "}
            </select>
          </li>
        </ul>
        <button
          className="calendar-action"
          onClick={() => {
            this.checkAvailability();
          }}
        >
          Check availability
        </button>
      </React.Fragment>
    );
  }
}
