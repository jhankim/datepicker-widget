import React from 'react';
import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';

export default class DatePickerA extends React.Component {
  constructor() {
    super();

    const dayINeed = 6;
    const today = moment().isoWeekday();
    let startDate;
    if (today <= dayINeed) {
      startDate = moment().isoWeekday(dayINeed);
    } else {
      startDate = moment()
        .add(1, 'weeks')
        .isoWeekday(dayINeed);
    }
    const endDate = moment(startDate).add(1, 'week');

    this.datePicker = React.createRef();

    this.state = {
      startDate: null,
      endDate: null,
      numberOfAdults: 2,
      numberOfChildren: 0,
      focusedInput: null,
    };
  }

  renderCalendarInfo() {
    return (
      <p className="calendar-info">
        ❕ Please search your vacation dates from Saturday – Saturday. We do have a 3-night minimum,
        call our office for availability! 😊
      </p>
    );
  }

  onPersonnelChange(e) {
    const stateProp = e.currentTarget.name;
    const value = e.currentTarget.value;
    this.setState(() => ({
      [stateProp]: value,
    }));
  }

  checkAvailability() {
    // format: ?pAdults=1&pChildren=0&pDateStart=07%2f06%2f19&pDateEnd=07%2f13%2f19
    const dateStart = this.state.startDate.format('MM/DD/YY');
    const dateEnd = this.state.endDate.format('MM/DD/YY');
    const { numberOfAdults, numberOfChildren } = this.state;

    const innroadLink = `http://clients.innroad.com/gulfside/logon.aspx?adults=${numberOfAdults}&children=${numberOfChildren}&dateStart=${dateStart}&dateEnd=${dateEnd}&propertyID=1564&promoCode=&pAdults=${numberOfAdults}&pChildren=${numberOfChildren}&pDateStart=${dateStart}&pDateEnd=${dateEnd}`;
    const newWin = window.open(innroadLink, '_blank');
    newWin.focus();
  }

  handleFocusChange = focusedInput => {
    this.datePicker.current.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
    this.setState({ focusedInput });
  };

  render() {
    return (
      <div ref={this.datePicker}>
        <DateRangePicker
          startDate={this.state.startDate} // momentPropTypes.momentObj or null,
          startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
          endDate={this.state.endDate} // momentPropTypes.momentObj or null,
          endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
          onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
          focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          onFocusChange={this.handleFocusChange} // PropTypes.func.isRequired,
          endDateOffset={day => {
            return day.add(7, 'days');
          }}
          renderCalendarInfo={this.renderCalendarInfo}
          showDefaultInputIcon
          readOnly
          hideKeyboardShortcutsPanel
        />

        <ul className="dropdown-list">
          <li>
            <label htmlFor="numberOfAdults">Adults</label>
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
            <label htmlFor="numberOfChildren">Children</label>
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
              <option value="10">10</option>{' '}
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
      </div>
    );
  }
}
