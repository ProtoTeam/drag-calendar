import { Types } from '../../util/constant'
import _ from 'lodash'

const hoverFunc = (props, monitor) => {
  const dragType = monitor.getItemType()
  if (!monitor.getItem()) return
  if (!memorize({
      dragType,
      hoverDate: props.dateData.date,
      targetDate: monitor.getItem().date,
      id: monitor.getItem().id
    })) {
    return
  }
  if (dragType !== Types.NEW) {
    props.setHoverState({
      id: monitor.getItem().id,
      targetDate: monitor.getItem().date,
      hoverDate: props.dateData.date,
    dragType})

    props.setHoverEventList({
      dragType,
      hoverDate: props.dateData.date,
      targetDate: monitor.getItem().date,
      id: monitor.getItem().id
    })
  } else {
    props.setHoverState({
      id: undefined,
      targetDate: monitor.getItem().date,
      hoverDate: props.dateData.date,
    dragType})
  }
}

let lastHoverParams = {}

// 同一个位置不再触发hover
const memorize = (data) => {
  if (_.isEqual(data, lastHoverParams)) {
    return false
  } else {
    lastHoverParams = data
    return true
  }
}

export const dayTarget = {
  drop(props, monitor) {
    return {
      dateType: props.dateType,
      dropTime: props.dateData.date
    }
  },
  // hover本身加上了throttle
  hover: _.throttle(hoverFunc, 80)
}
