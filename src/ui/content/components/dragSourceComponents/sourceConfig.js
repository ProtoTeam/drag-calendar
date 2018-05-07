import moment from 'moment';
import {
  Types
} from '../../util/constant';

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
    const {
      dropTime,
      dateType
    } = monitor.getDropResult();
    const daysM = moment(moment(props.event.endTime).format('YYYY-MM-DD')).valueOf() - moment(dropTime).valueOf();
    const hourMinutes = moment(props.event.endTime).valueOf() - daysM - moment(dropTime).valueOf();
    const finalEndTime = moment(moment(dropTime).valueOf() + hourMinutes).format(dateType);
    props.onChangeTime(props.event.id, props.event.startTime, finalEndTime);
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
    const {
      dropTime,
      dateType
    } = monitor.getDropResult();
    const diff = moment(props.event.date).valueOf() - moment(props.event.startTime).valueOf();
    const newStartTime = moment(moment(dropTime).valueOf() - diff).format(dateType);
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
    const {
      dropTime,
      dateType
    } = monitor.getDropResult();

    const daysM = moment(moment(props.event.startTime).format('YYYY-MM-DD')).valueOf() - moment(dropTime).valueOf();
    const hourMinutes = moment(props.event.startTime).valueOf() - daysM - moment(dropTime).valueOf();
    const finalStartime = moment(moment(dropTime).valueOf() + hourMinutes).format(dateType);

    props.onChangeTime(props.event.id, finalStartime, props.event.endTime);
  },
};

export const sourceCollect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
};