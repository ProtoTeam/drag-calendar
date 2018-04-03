import moment from 'moment';
import { Types } from '../../util/constant';

export const forwardSource = {
  beginDrag(props) {
    return {
      ...props.event,
    };
  },
  endDrag(props, monitor) {
    props.setHoverState({});
    if (!monitor.didDrop()) {
      props.resetEventLists();
      return;
    }
    const { dropTime } = monitor.getDropResult();
    props.onChangeTime(props.event.id, props.event.startTime, dropTime);
  },
};

export const eventSource = {
  beginDrag(props) {
    props.clearDragEvent(props.event.id);
    return {
      ...props.event,
    };
  },
  endDrag(props, monitor) {
    props.setHoverState({});
    if (!monitor.didDrop()) {
      props.resetEventLists();
      return;
    }
    const { dropTime } = monitor.getDropResult();
    const diff = moment(props.event.date).valueOf() - moment(props.event.startTime).valueOf();
    const newStartTime = moment(moment(dropTime).valueOf() - diff).format('YYYY-MM-DD');
    props.onChangeTime(props.event.id, newStartTime);
  },
};

export const backwardSource = {
  beginDrag(props) {
    return {
      ...props.event,
    };
  },
  endDrag(props, monitor) {
    props.setHoverState({});
    if (!monitor.didDrop()) {
      props.resetEventLists();
      return;
    }
    const { dropTime } = monitor.getDropResult();
    props.onChangeTime(props.event.id, dropTime, props.event.endTime);
  },
};

export const sourceCollect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
};