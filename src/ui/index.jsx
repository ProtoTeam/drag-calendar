import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Button, Icon } from 'antd';
import { MONTH_TYPE, HeaderText } from '../util/constant';
import DateContent from './content/index.jsx';

import './index.less';

class Calendar extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
  };

  calDate = monthStr => {
    const newDateData = [];
    const startDay = moment(monthStr).startOf('month').day();
    const endDate = moment(monthStr).endOf('month').date();
    // 填好这个月以及下个月的数据
    let index = 1;
    let nextMonthIndex = 1;
    for (let i = startDay; i < 42; i++) {
      if (index > endDate) {
        const tempIndex = nextMonthIndex++;
        newDateData[i] = {
          date: moment(monthStr).add(1, 'M').add(tempIndex - 1, 'd').format('YYYY-MM-DD'),
          displayDate: tempIndex,
          type: MONTH_TYPE.NEXT_MONTH,
          className: 'next-month',
          index: i,
        };
      } else {
        const tempIndex = index++;
        newDateData[i] = {
          date: moment(monthStr).add(tempIndex - 1, 'd').format('YYYY-MM-DD'),
          displayDate: tempIndex,
          type: MONTH_TYPE.THIS_MONTH,
          className: '',
          index: i,
        };
      }
    }

    let lastMonthEndDate = moment(monthStr).subtract(1, 'month').endOf('month').date();
    const lastMonthEndDay = moment(monthStr).subtract(1, 'month').endOf('month').day();
    if (lastMonthEndDay < 6) {
      for (let i = lastMonthEndDay; i >= 0; i--) {
        const tempIndex = lastMonthEndDate--;
        newDateData[i] = {
          date: moment(monthStr).subtract(1, 'month').add(tempIndex - 1, 'd').format('YYYY-MM-DD'),
          displayDate: tempIndex,
          type: MONTH_TYPE.LAST_MONTH,
          className: 'last-month',
          index: i,
        };
      }
    }

    return newDateData;
  };

  deleteMonth = () => {
    const { changeMonth, monthStr } = this.props;
    const newMonthStr = moment(monthStr).subtract(1, 'M').format('YYYY-MM');
    changeMonth(newMonthStr);
  }

  addMonth = () => {
    const { changeMonth, monthStr } = this.props;
    const newMonthStr = moment(monthStr).add(1, 'M').format('YYYY-MM');
    changeMonth(newMonthStr);
  }

  render() {
    const {
      eventList, onChangeTime, createNewEvent, deleteEvent, eventForm, draggable, popoverControl, monthStr, children, dateType
    } = this.props;
    const date = this.calDate(monthStr);
    return (
      <div className="x-calendar">
        {children ? children : null}
        <div className="date-header">
          <div className="date-string">{moment(monthStr).format("YYYY 年 MM 月")}</div>
          <div className="date-switcher">
            <Button size="small" onClick={this.deleteMonth}>
              <Icon type="left" />
            </Button>
            <Button size="small" onClick={this.addMonth}>
              <Icon type="right" />
            </Button>
          </div>
        </div>
        <div className="week-header">
          {
            HeaderText.map(text => {
              return (
                <div key={text} className="date-week-key">
                  {text}
                </div>
              );
            })
          }
        </div>
        <DateContent
          dateData={date}
          eventList={eventList}
          onChangeTime={onChangeTime}
          createNewEvent={createNewEvent}
          deleteEvent={deleteEvent}
          eventForm={eventForm}
          dateType={dateType || 'YYYY-MM-DD'}
          popoverControl={popoverControl === false ? false : true}
          draggable={draggable === false ? false : true}
        />
      </div>
    );
  }
}

export default Calendar;
