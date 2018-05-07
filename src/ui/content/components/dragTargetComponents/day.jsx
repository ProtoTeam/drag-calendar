import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import EventWrap from '../eventWrap.jsx';
import New from '../dragSourceComponents/new.jsx';
import { Types } from '../../util/constant';
import { dayTarget } from './targetConfig';
import {
  getDateAllEvents, sortAllEvents,
  getShowEventsArr, calNewLastEvents,
} from '../../util/calEventsHelper';
import './day.less';

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

@DropTarget([Types.EVENT, Types.FORWARD, Types.BACKWARD, Types.NEW], dayTarget, collect)
class Day extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
  };

  /**
   * 渲染事件区域
   */
  renderEvents = data => {
    const { onChangeTime, setHoverState, clearDragEvent, dateType,
      resetEventLists, deleteEvent, eventForm, draggable, popoverControl
    } = this.props;
    const { date, dateIndex, eventList, lastEventsArr } = data;
    let eventAll = getDateAllEvents(date, eventList);
    eventAll = sortAllEvents(eventAll);
    const finalShowEventsArr = getShowEventsArr(dateIndex, lastEventsArr, eventAll);
    lastEventsArr[dateIndex] = calNewLastEvents(eventAll);

    return (
      <div className="d-event-container">
        {finalShowEventsArr.map((event, index, array) => {
          // 占位用
          if (event === null) {
            return (
              <div key={index} className="d-event-content empty">
                {draggable ? this.renderNewDragComponent() : null}
              </div>
            );
          }
          const eventText = (event.hasLast && dateIndex % 7 !== 0) ? '' : event.displayName;
          return (
            <EventWrap
              popoverControl={popoverControl}
              key={event.id}
              draggable={draggable}
              eventText={eventText}
              event={event}
              onChangeTime={onChangeTime}
              setHoverState={setHoverState}
              clearDragEvent={clearDragEvent}
              resetEventLists={resetEventLists}
              deleteEvent={deleteEvent}
              eventForm={eventForm}
            />
          );
        })}
      </div>
    );
  };

  /**
   * 渲染新建的拖拽区域
   */
  renderNewDragComponent = (text) => {
    const { setHoverState, clearDragEvent, resetEventLists, createNewEvent, dateData, dateType } = this.props;
    return (
      <New
        dateType={dateType}
        date={dateData.date}
        createNewEvent={createNewEvent}
        setHoverState={setHoverState}
        clearDragEvent={clearDragEvent}
        resetEventLists={resetEventLists}
      >
        {text}
      </New>
    );
  };

  render() {
    const { dateData, lastEventsArr, eventList, connectDropTarget, draggable, dateType } = this.props;
    const hoverClass = dateData._hover ? "hover" : '';
    return connectDropTarget(
      <div className={`d ${dateData.className} ${hoverClass}`}>
        <div className="d-header">
          {draggable ? this.renderNewDragComponent(`${dateData.displayDate} 日`) : `${dateData.displayDate} 日`}
        </div>
        {this.renderEvents({
          date: dateData.date,
          dateIndex: dateData.index,
          eventList,
          lastEventsArr,
        })}
        <div className="d-empty-container">
          {draggable ? this.renderNewDragComponent() : null}
        </div>
      </div>
    );
  }
}

export default Day;
