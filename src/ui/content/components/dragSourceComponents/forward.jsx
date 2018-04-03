import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Types } from "../../util/constant";
import { getEmptyImage } from 'react-dnd-html5-backend';
import { forwardSource, sourceCollect } from './sourceConfig';
import { DragSource } from 'react-dnd';

@DragSource(Types.FORWARD, forwardSource, sourceCollect)
class Forward extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
  };

  componentDidMount() {
    this.props.connectDragPreview(getEmptyImage(), { captureDraggingState: true })
  }

  render() {
    const { connectDragSource } = this.props;
    return connectDragSource(
      <div className="d-forward">
      </div>
    );
  }
}

export default Forward;
