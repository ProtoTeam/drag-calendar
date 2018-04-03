import { EVENT_CLASS_NAME } from '../../../util/constant';
import moment from 'moment';

// 获取制定日期的所有事件
export const getDateAllEvents = (date, eventList) => {
  const eventAll = [];
  eventList.forEach(event => {
    const tempEvent = {
      id: event.id,
      hasLast: false,
      hasNext: false,
      date: date,
      startTime: event.startTime,
      endTime: event.endTime,
      userId: event.userId,
      displayName: event.displayName,
      _hide: event._hide,
      eventClassName: EVENT_CLASS_NAME[event.userId%4],
    };
    const dateMills = moment(date).valueOf();
    const startTimeMills = moment(event.startTime).valueOf();
    const endTimeMills = moment(event.endTime).valueOf();
    const inStartTime = startTimeMills <= dateMills;
    const isStartTime = startTimeMills === dateMills;
    const inEndTime = endTimeMills >= dateMills;
    const isEndTime = endTimeMills === dateMills;
    if (inStartTime && inEndTime) {
      if (!isStartTime) tempEvent.hasLast = true;
      if (!isEndTime) tempEvent.hasNext = true;
      eventAll.push(tempEvent);
    }
  });
  return eventAll;
};

// 按一定规则将事件排序
export const sortAllEvents = (eventAll) => {
  return eventAll.sort((a, b) => {
    if (a.hasLast) {
      if (!b.hasLast) {
        return -1;
      } else if (moment(a.endTime).valueOf() > moment(b.endTime).valueOf()) {
        return -1;
      }
    }
    if (a.hasNext) {
      if (!b.hasNext) {
        return -1;
      } else if (moment(a.endTime).valueOf() > moment(b.endTime).valueOf()) {
        return -1;
      }
    }
    return 1;
  });
};

// 将数组中空白的填充，如果新的一周的话会进行优化
function fixBlank(dateIndex, showEventsArr) {
  let finalShowEventsArr = [];
  // 填满空白
  if (dateIndex % 7 === 0 ) {
    for (let i = showEventsArr.length; i >= 0; i--) {
      if (showEventsArr[i]) {
        finalShowEventsArr.unshift(showEventsArr[i]);
      }
    }
    finalShowEventsArr.forEach((event, index) => {
      event._index = index;
    });
  } else {
    for (let i = showEventsArr.length - 1; i >= 0; i--) {
      if (!showEventsArr[i]) {
        showEventsArr[i] = null;
      }
    }
    finalShowEventsArr = showEventsArr;
  }
  return finalShowEventsArr;
}

// 拿到最后展示的数组
export const getShowEventsArr = (dateIndex, lastEventsArr, eventAll) => {
  // 先放入延续的事件
  // 拿到之前的事件的_index
  const lastEvents = dateIndex > 0 ? lastEventsArr[dateIndex - 1] || [] : [];
  const showEventsArr = [];
  lastEvents.forEach(lastEvent => {
    eventAll.forEach(event => {
      if (event.id === lastEvent.id) {
        showEventsArr[lastEvent._index] = event;
        event._index = lastEvent._index;
      }
    });
  });

  // 塞入有延续的和只有今天的
  eventAll.forEach(event => {
    if (event._index !== undefined) return;
    // 现在都是没有_index的
    let hasIndex = false;

    for (let i = 0; i <= showEventsArr.length; i++) {
      if (!showEventsArr[i]) {
        hasIndex = true;
        event._index = i;
        showEventsArr[i] = event;
        break;
      }
    }

    if (!hasIndex) {
      event._index = showEventsArr.length;
      showEventsArr.push(event);
    }
  });
  return fixBlank(dateIndex, showEventsArr);
};

// 将有未来事件的抽出来
export const calNewLastEvents = (eventAll) => {
  const newNextEvents = [];
  eventAll.forEach(event => {
    if (event.hasNext) {
      newNextEvents.push(event);
    }
  });
  return newNextEvents;
}

export const calEventClassName = (event) => {
  let nextLastClass = '';
  if (event.hasLast) {
    nextLastClass += 'has-last';
  }
  if (event.hasNext) {
    nextLastClass += ' has-next';
  }
  return `${event.eventClassName} ${nextLastClass} ${event._hide ? "e-hide" : ""}`;
}

