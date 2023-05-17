import { ReactElement, useEffect } from 'react'
import { Breadcrumb, Col, Divider, Row, Typography, Image, Button, Card, Space, Form, Input } from 'antd'
import { ContactForm } from '~/components/Contact'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFax, faPhone, faSquareEnvelope } from '@fortawesome/free-solid-svg-icons'
import { useAppSelector } from '~/redux/hooks'
import { authState } from '~/redux/reducers/authSlice'
const { Title, Paragraph, Text } = Typography
const Infomation = () => {
  const { user } = useAppSelector(authState)
  console.log('user', user)
  useEffect(() => {
    document.title = 'Thông tin tài khoản'
  }, [])

  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  }
  return (
    <section className='tw-shadow-lg tw-rounded-sm'>
      <div className='tw-w-2/3 tw-mx-auto tw-p-6 '>
        <Form
          className='tw-block tw-w-full tw-mx-auto'
          initialValues={{
            fullname: user?.fullname
          }}
        >
          <Form.Item
            {...formItemLayout}
            name='fullname'
            label={
              <Title level={5} className='tw-m-0'>
                Họ tên:{' '}
              </Title>
            }
            rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
          >
            <Input placeholder='Trần Văn A' />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            name='phone'
            label={
              <Title level={5} className='tw-m-0'>
                Số điện thoại:{' '}
              </Title>
            }
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
          >
            <Input placeholder='0123456789' />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            name='email'
            label={
              <Title level={5} className='tw-m-0'>
                Email:{' '}
              </Title>
            }
            rules={[
              { required: true, message: 'Vui lòng nhập địa chỉ email' },
              { type: 'email', message: 'Địa chỉ email không hợp lệ' }
            ]}
          >
            <Input placeholder='example@email' />
          </Form.Item>
        </Form>
      </div>
    </section>
  )
}

export default Infomation
