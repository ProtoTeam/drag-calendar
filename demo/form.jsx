import React, { PureComponent } from 'react';
import { Form, Icon, Input, Button, Checkbox, DatePicker } from 'antd';
import './form.less';
import moment from 'moment';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

class CForm extends PureComponent {
  handleSubmit = (e) => {
    e.preventDefault();
    const { onChangeTime, event, closePopover } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onChangeTime(
          event.id,
          values['startTime'].format('YYYY-MM-DD'),
          values['endTime'].format('YYYY-MM-DD'),
        );
        closePopover();
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { event } = this.props;
    return (
      <Form className="custom-form" onSubmit={this.handleSubmit}>
        {event.displayName}
        <Button className="delete" onClick={() => { this.props.deleteEvent(this.props.event.id); }}><Icon type="delete" /></Button>
        <FormItem
          {...formItemLayout}
          label="startTime"
        >
          {getFieldDecorator('startTime', {
            initialValue: moment(event.startTime),
          })(
            <DatePicker allowClear={false} format="YYYY-MM-DD" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="endTime"
        >
          {getFieldDecorator('endTime', {
            initialValue: moment(event.endTime),
          })(
            <DatePicker allowClear={false} format="YYYY-MM-DD" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
        >
          <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.handleSubmit}>
            OK
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(CForm);
