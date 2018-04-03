import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { backwardSource, sourceCollect } from './sourceConfig';
import { Types } from "../../util/constant";
import { getEmptyImage } from 'react-dnd-html5-backend';
import { DragSource } from 'react-dnd';

@DragSource(Types.BACKWARD, backwardSource, sourceCollect)
class Backward extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
  };

  componentDidMount() {
    this.props.connectDragPreview(getEmptyImage(), { captureDraggingState: true })
  }

  render() {
    const { connectDragSource } = this.props;
    return connectDragSource(
      <div className="d-backward">
      </div>
    );
  }
}

export default Backward;
