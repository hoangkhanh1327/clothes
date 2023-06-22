import { Button, Form, Input, notification } from 'antd'
import { Icon } from '../Generals'
import { AuthServices } from '~/services'
import { Fragment } from 'react'
import { useLocation } from 'react-router-dom'

interface RegisterFormProps {
  refreshTab: () => void
}

const RegisterForm: React.FC<RegisterFormProps> = ({ refreshTab }) => {
  const [form] = Form.useForm()
  const [api, contextHolder] = notification.useNotification()

  const onFinish = async (values: any) => {
    try {
      const res = await AuthServices.register(values)
      console.log('res', res)
      refreshTab()
    } catch (error) {
      api.error({
        message: 'Đăng ký thất bại!',
        description: `${(error as Error)?.message}`
      })
    }
  }

  return (
    <Fragment>
      {contextHolder}
      <Form layout='vertical' form={form} onFinish={onFinish}>
        <Form.Item
          name='fullname'
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập đủ họ tên!'
            }
          ]}
        >
          <Input
            prefix={<Icon name='UserOutlined' style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder='Họ tên'
            size='large'
          />
        </Form.Item>
        <Form.Item
          name='email'
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!'
            },
            {
              required: true,
              message: 'Please input your E-mail!'
            }
          ]}
        >
          <Input
            prefix={<Icon name='MailOutlined' style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder='abc@gmail ...'
            size='large'
          />
        </Form.Item>
        <Form.Item name='password' rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}>
          <Input.Password
            autoComplete='false'
            prefix={<Icon name='LockOutlined' style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder='Password'
            size='large'
          />
        </Form.Item>
        <Form.Item
          name='password_confirm'
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập mật khẩu'
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('Mật khẩu không trùng khớp!!'))
              }
            })
          ]}
        >
          <Input.Password
            autoComplete='false'
            prefix={<Icon name='LockOutlined' style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder='Confirm Password'
            size='large'
          />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit' className='tw-font-semibold' size='large' block>
            Tạo Tài Khoản
          </Button>
        </Form.Item>
      </Form>
    </Fragment>
  )
}
export default RegisterForm
