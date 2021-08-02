import React, { Component } from 'react';
import { Form, Button, Col, Row, Input, Icon, Checkbox } from 'antd';
import { connect } from 'dva';
import { setCookie, getCookie } from '@utils/authCK';
import md5 from 'blueimp-md5';
import style from './style.css';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class UserLogin extends Component {
  state = { visible: false };
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    //* To disable submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = e => {
    e.preventDefault();
    // this.props.form.validateFields();
    this.props.form.validateFields((err, values) => {
      const { dispatch } = this.props;
      dispatch({
        type: 'Login/loginIn',
        payload: {
          realname: values.userName,
          password: md5(values.password),
        },
      });
      if (values.remember === true) {
        setCookie(values.userName, values.password, 7);
      }
    });
  };

  handleSelectChange = e => {
    console.log(e.target.value, getCookie(e.target.value));
    if (getCookie(e.target.value)) {
      this.props.form.setFieldsValue({
        password: getCookie(e.target.value),
      });
    }
  };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const userNameError = isFieldTouched('userName') && getFieldError('userName');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    return (
      <div className={style.bg}>
        <div className={style.title}>绥德县行政事业单位人员工资查询系统</div>
        <div className={style.login}>
          <Form
            layout="vertical"
            hideRequiredMark
            style={{ marginTop: 8 }}
            onSubmit={this.handleSubmit}
          >
            <Row gutter={12}>
              <Col span={14} offset={5}>
                <Form.Item
                  label="用户名"
                  validateStatus={userNameError ? 'error' : ''}
                  help={userNameError || ''}
                >
                  {getFieldDecorator('userName', {
                    rules: [
                      { required: true, message: 'Please enter name!' },
                      // {
                      //   pattern: new RegExp(/^[\u4e00-\u9fa5]/g, ''),
                      //   message: 'User names must be in Chinese!',
                      // },
                      {
                        min: 3,
                        max: 100,
                        message: 'The length is out of range!',
                      },
                      {
                        whitespace: true,
                        message: 'No Spaces are allowed!',
                      },
                    ],
                    initialValue: '',
                  })(
                    <Input
                      placeholder="Please enter user name"
                      size="large"
                      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      onChange={()=>this.handleSelectChange.bind(this)}
                      allowClear={true}
                    />,
                  )}
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={12}>
              <Col span={14} offset={5}>
                <Form.Item
                  label="密码"
                  validateStatus={passwordError ? 'error' : ''}
                  help={passwordError || ''}
                >
                  {getFieldDecorator('password', {
                    rules: [
                      { required: true, message: 'Please enter password!' },
                      {
                        whitespace: true,
                        message: 'No Spaces are allowed!',
                      },
                    ],
                    initialValue: '',
                  })(
                    <Input.Password
                      placeholder="Please enter user password"
                      size="large"
                      prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      type="password"
                      allowClear={true}
                    />,
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col span={10} offset={10}>
                <Form.Item>
                  {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true,
                    getValueFromEvent(e) {
                      console.log(e);
                      return e.target.checked;
                    },
                  })(<Checkbox>记住密码</Checkbox>)}
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={12}>
              <Col span={10} offset={7}>
                <Form.Item>
                  <Button
                    block
                    // onClick={this.onClose}
                    type="primary"
                    size="large"
                    htmlType="submit"
                    disabled={hasErrors(getFieldsError())}
                  >
                      登陆
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    );
  }
}

const Login = Form.create({ name: 'normal_login' })(UserLogin);

const mapStateToProps = state => state.login;
export default connect(mapStateToProps)(Login);
