import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Event from './dragSourceComponents/event.jsx';
import Backward from './dragSourceComponents/backward.jsx';
import Forward from './dragSourceComponents/forward.jsx';

class EventWrap extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    const { event } = this.props;

    return (
      <div className="d-event-content">
        { !event.hasLast ? <Backward {...this.props} /> : null}
        <Event {...this.props} />
        { !event.hasNext ? <Forward {...this.props} /> : null}
      </div>
    );
  }
}

export default EventWrap;
