import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Day from './dragTargetComponents/day.jsx';

class Week extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    const { eventList, lastEventsArr, resetEventLists, setHoverEventList, createNewEvent, deleteEvent, eventForm,
      onChangeTime, weekArr, setHoverState, clearDragEvent } = this.props;
    return (
      <div  className="w">
        {weekArr.map(dateData => {
          return (
            <Day
              key={dateData.date}
              dateData={dateData}
              lastEventsArr={lastEventsArr}
              eventList={eventList}
              onChangeTime={onChangeTime}
              setHoverState={setHoverState}
              clearDragEvent={clearDragEvent}
              resetEventLists={resetEventLists}
              createNewEvent={createNewEvent}
              setHoverEventList={setHoverEventList}
              deleteEvent={deleteEvent}
              eventForm={eventForm}
            />
          );
        })}
      </div>
    );
  }
}

export default Week;
