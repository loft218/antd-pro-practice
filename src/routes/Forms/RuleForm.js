import React, { PureComponent } from 'react';
import qs from 'querystring';
import { connect } from 'dva';
import moment from 'moment';

import {
  Card, Form, Input, Select, DatePicker, Button, Spin,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const status = ['关闭', '运行中', '已上线', '异常'];

@Form.create()
@connect(({ ruleForm, loading }) => ({
  ruleForm,
  loading: loading.effects['ruleForm/getOneRule'],
}))
export default class RuleForm extends PureComponent {
  componentDidMount() {
    console.log(this.props);
    this.props.dispatch({
      type: 'ruleForm/getOneRule',
      payload: {
        key: this.urlParams.id,
      },
    });
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'ruleForm/reset',
    });
  }

  get urlParams() {
    let { search } = this.props.location;
    if (!search) return '';
    if (search.startsWith('?')) search = search.substr(1);
    const params = qs.parse(search);
    return params;
  }

  handleDateChange = (value, dateString) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  }

  handleDateOk = (value) => {
    console.log('onOk: ', value);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) return console.error(err);
      this.props.dispatch({
        type: 'ruleForm/submitRuleForm',
        payload: values,
      });
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };

    const { ruleForm, loading } = this.props;

    return (

      <PageHeaderLayout title="编辑表单" content="编辑Rule表单">
        <Card bordered={false}>
          <Spin spinning={loading}>

            <Form
              onSubmit={this.handleSubmit}
            >
              <Form.Item {...formItemLayout} label="Key">
                {
                  getFieldDecorator('key', {
                    initialValue: ruleForm.key,
                  })(<Input placeholder="" disabled />)
                }
              </Form.Item>
              <Form.Item {...formItemLayout} label="描述">
                {
                  getFieldDecorator('description', {
                    rules: [
                      { required: true, message: '描述不能为空' },
                    ],
                    initialValue: ruleForm.description,
                  })(<Input placeholder="描述" />)
                }
              </Form.Item>

              <Form.Item {...formItemLayout} label="服务调用次数">
                {
                  getFieldDecorator('callNo', {
                    initialValue: ruleForm.callNo,
                  })(<Input placeholder="0" />)
                }
              </Form.Item>

              <Form.Item {...formItemLayout} label="状态">
                {
                  getFieldDecorator('status', {
                    initialValue: String(ruleForm.status),
                  })(
                    <Select placeholder="选择状态">
                      {
                        status.map(
                          (elem, index) => (
                            <Select.Option key={elem} value={String(index)}>{elem}</Select.Option>))
                      }
                    </Select>)
                }

              </Form.Item>

              <Form.Item {...formItemLayout} label="更新时间">
                {
                  getFieldDecorator('updatedAt', {
                    rules: [
                      { required: true, message: '描述不能为空' },
                    ],
                    initialValue: moment(ruleForm.updatedAt),
                  })(
                    <DatePicker
                      showTime
                      format="YYYY-MM-DD HH:mm:ss"
                      placeholder="选择时间"
                      onChange={this.handleDateChange}
                      onOk={this.handleDateOk}
                    />
                  )
                }
              </Form.Item>

              <Form.Item {...submitFormLayout}>
                <Button type="primary" htmlType="submit">提交</Button>
              </Form.Item>
            </Form>
          </Spin>
        </Card>
      </PageHeaderLayout>

    );
  }
}
