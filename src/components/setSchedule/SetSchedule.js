import React, {Component} from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import './setschedule.css';

class SetSchedule extends Component {
    state={
        from: undefined,
        to: undefined
    }
    static defaultProps = {
        numberOfMonths: 2,
      };

      getInitialState = () => {
        return {
          from: undefined,
          to: undefined,
        };
      }

      handleDayClick = (day) => {
        const range = DateUtils.addDayToRange(day, this.state);
        this.setState(range);
      }
      handleResetClick = () => {
        this.setState(this.getInitialState());
      }


    render() {
        const { from, to } = this.state;
    const modifiers = { start: from, end: to };
        return(
            <section className="col-sm-7 schedule-section">
                <header><h2>Schedule a Start and/or End Date.</h2></header>
                <div className="col-xs-4 dates-selected">
                    <p>
                    {!from && !to && 'Please select the first day.'}
                    {from && !to && 'Please select the last day.'}
                    {from &&
                        to &&
                        `Selected from ${from.toLocaleDateString()} to
                            ${to.toLocaleDateString()}`}{' '}
                    {from &&
                        to && (
                        <button className="link" onClick={this.handleResetClick}>
                            Reset
                        </button>
                        )}
                    </p>
                </div>
                <div className="col-xs-8">
                    <DayPicker
                        className="Selectable"
                        numberOfMonths={this.props.numberOfMonths}
                        selectedDays={[from, { from, to }]}
                        modifiers={modifiers}
                        onDayClick={this.handleDayClick}
                        />
                </div>
                
        
               
            </section>)
    }
}

export default SetSchedule;