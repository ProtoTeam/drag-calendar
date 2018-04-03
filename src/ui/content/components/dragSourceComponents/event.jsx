import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { Popover, Button, Icon } from 'antd';
import { Types } from '../../util/constant';
import { calEventClassName } from '../../util/calEventsHelper';
import { eventSource, sourceCollect } from './sourceConfig';

@DragSource(Types.EVENT, eventSource, sourceCollect)
class Event extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
  };

  state = {
    popoverVisible: false,
  }

  componentDidMount() {
    this.props.connectDragPreview(getEmptyImage(), { captureDraggingState: true })
  }

  closePopover = () => {
    this.setState({
      popoverVisible: false,
    });
  }

  showPopover = () => {
    this.setState({
      popoverVisible: true,
    });
  }

  render() {
    const { eventText, event, connectDragSource, deleteEvent, eventForm} = this.props;
    const { popoverVisible } = this.state;
    return connectDragSource(
      <div className={`d-event ${calEventClassName(event)}`}>
        <Popover
          content={
            eventForm(event, this.closePopover)
          }
          title=""
          trigger="click"
          visible={popoverVisible}
          placement="right" >
          <div onClick={this.showPopover} className="d-holder">
            {eventText}
          </div>
        </Popover>
      </div>
    );
  }
}

export default Event;
