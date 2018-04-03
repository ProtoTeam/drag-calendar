import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import './index.css';
import Calendar from 'drag-calendar';
import CustomForm from './form.jsx';
let eventIndex = 100;
const eventList = [
  {
    id: 12,
    startTime: "2018-04-4",
    endTime: "2018-04-15",
    displayName: "（主）小鹿",
    userId: 1,
  },
  {
    id: 15,
    startTime: "2018-04-05",
    endTime: "2018-04-06",
    displayName: "（主）小鹿",
    userId: 2,
  },
  {
    id: 13,
    startTime: "2018-04-4",
    endTime: "2018-04-9",
    displayName: "（主）小鹿",
    userId: 3,
  },
  {
    id: 14,
    startTime: "2018-03-27",
    endTime: "2018-04-3",
    displayName: "（主）小鹿",
    userId: 4,
  },
  {
    id: 11,
    startTime: "2018-03-28",
    endTime: "2018-04-4",
    displayName: "（主）小鹿",
    userId: 5,
  },
  {
    id: 16,
    startTime: "2018-04-09",
    endTime: "2018-04-11",
    displayName: "（主）小鹿",
    userId: 6,
  },
  {
    id: 17,
    startTime: "2018-04-10",
    endTime: "2018-04-10",
    primary: "main",
    displayName: "（主）小鹿",
    userId: 7,
  },
];

class App extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      eventList,
    }
  }

  onChangeTime = (id, newStartTime, newEndtime) => {
    const { eventList } = this.state;
    eventList.forEach(event => {
      if(event.id === id) {
        const addTimeMils = moment(newStartTime).valueOf() - moment(event.startTime).valueOf();
        event.startTime = newStartTime ? newStartTime : newStartTime;
        event.endTime = newEndtime ? newEndtime : moment(moment(event.endTime).valueOf() + addTimeMils).format('YYYY-MM-DD');
      }
    });
    this.setState({
      eventList: JSON.parse(JSON.stringify(eventList)),
    });
  };

  deleteEvent = id => {
    const { eventList } = this.state;
    let newEventList = JSON.parse(JSON.stringify(eventList));
    newEventList = _.filter(newEventList, e => {
      return e.id !== id;
    })
    this.setState({
      eventList: newEventList,
    });
  };

  createNewEvent = (startTime, endTime) => {
    const { eventList } = this.state;
    const newEventList = JSON.parse(JSON.stringify(eventList));
    newEventList.push({
      id: eventIndex++,
      startTime,
      endTime,
      displayName: "新建",
      userId: 3,
    });
    this.setState({
      eventList: newEventList,
    });
  };

  render() {
    const { eventList } = this.state;
    return (
      <div style={{ margin: 100 }}>
        <Calendar
          monthStr="2018-04"
          eventList={eventList}
          eventForm={(event, closePopover) => {
            return <CustomForm
              event={event}
              closePopover={closePopover}
              onChangeTime={this.onChangeTime}
              deleteEvent={this.deleteEvent}
            />
          }}
          onChangeTime={this.onChangeTime}
          deleteEvent={this.deleteEvent}
          createNewEvent={this.createNewEvent}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
