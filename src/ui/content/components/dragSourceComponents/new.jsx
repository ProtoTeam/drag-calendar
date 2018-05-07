import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Types } from "../../util/constant";
import { getEmptyImage } from 'react-dnd-html5-backend';
import moment from 'moment';
import { DragSource } from 'react-dnd';

const eventSource = {
  beginDrag(props) {
    return {
      date: props.date,
    };
  },
  endDrag(props, monitor) {
    props.setHoverState({});
    if (!monitor.didDrop()) {
      props.resetEventLists();
      return;
    }
    const { dropTime } = monitor.getDropResult();
    let startTime = props.date;
    let endTime = dropTime;
    if (moment(startTime).valueOf() > moment(endTime).valueOf()) {
      startTime = dropTime;
      endTime = props.date;
    }
    props.createNewEvent(`${startTime} 00:00:00`, `${endTime} 23:59:59`);
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}

@DragSource(Types.NEW, eventSource, collect)
class New extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
  };

  componentDidMount() {
    this.props.connectDragPreview(getEmptyImage(), { captureDraggingState: true })
  }

  render() {
    const { connectDragSource, date, dateType } = this.props;
    return connectDragSource(
      <div className="d-new" onDoubleClick={() => { this.props.createNewEvent(moment(`${date} 00:00:00`).format(dateType), moment(`${date} 23:59:59`).format(dateType)) }}>
        {this.props.children}
      </div>
    );
  }
}

export default New;
