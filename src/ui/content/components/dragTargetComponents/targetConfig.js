import { Types } from '../../util/constant';

export const dayTarget = {
  drop(props, monitor) {
    return {
      dropTime: props.dateData.date,
    }
  },
  hover(props, monitor) {
    const dragType = monitor.getItemType();
    if (dragType !== Types.NEW) {
      props.setHoverState({
        id: monitor.getItem().id,
        targetDate: monitor.getItem().date,
        hoverDate: props.dateData.date,
        dragType,
      });

      props.setHoverEventList({
        dragType,
        hoverDate: props.dateData.date,
        targetDate: monitor.getItem().date,
        id: monitor.getItem().id,
      });
    } else {
      props.setHoverState({
        id: undefined,
        targetDate: monitor.getItem().date,
        hoverDate: props.dateData.date,
        dragType,
      });
    }
  }
}