import { useEffect, useState } from 'react'
import { Col, Row, Typography, Image, Input, Button } from 'antd'
import { useAppSelector } from '~/redux/hooks'
import { authState } from '~/redux/reducers/authSlice'
import { AddressTable, InfomationForm } from '~/components/User/Infomation'
import { Icon } from '~/components/Generals'
const { Title, Paragraph, Text } = Typography
const Infomation = () => {
  const { user } = useAppSelector(authState)
  const [formVisible, toggleFormVisible] = useState(false)
  const [addressListVisible, toggleAddressListVisible] = useState(false)

  useEffect(() => {
    document.title = 'Thông tin tài khoản'
  }, [])

  return (
    <section className='tw-relative tw-p-6 tw-min-h-full tw-h-full tw-flex tw-flex-col'>
      <Title level={3}>Thông tin chung</Title>
      <div className='tw-text-center tw-mb-4'>
        <Image
          alt='user-avatar'
          width={100}
          height={100}
          preview={false}
          className='tw-rounded-full'
          src={user?.photo}
        />
      </div>
      <Row gutter={24} className='tw-mb-6'>
        <Col span={6} md={{ span: 4 }}>
          <Title level={5} className='tw-m-0 tw-text-left'>
            Họ tên
          </Title>
        </Col>
        <Col span={18} md={{ span: 20 }}>
          <Input defaultValue={user?.fullname} disabled={true} />
        </Col>
      </Row>
      <Row gutter={24} className='tw-mb-6'>
        <Col span={6} md={{ span: 4 }}>
          <Title level={5} className='tw-m-0 tw-text-left'>
            Số điện thoại
          </Title>
        </Col>
        <Col span={18} md={{ span: 20 }}>
          <Input defaultValue={user?.phoneNumber} disabled={true} />
        </Col>
      </Row>
      <Row gutter={24} className='tw-mb-6'>
        <Col span={6} md={{ span: 4 }}>
          <Title level={5} className='tw-m-0 tw-text-left'>
            Địa chỉ Email
          </Title>
        </Col>
        <Col span={18} md={{ span: 20 }}>
          <Input defaultValue={user?.email} disabled={true} />
        </Col>
      </Row>
      <Row gutter={24} className='tw-mb-6'>
        <Col span={6} md={{ span: 4 }}>
          <Title level={5} className='tw-m-0 tw-text-left'>
            Địa chỉ
          </Title>
        </Col>
        <Col span={14} md={{ span: 16 }}>
          <Input defaultValue={user?.address} disabled={true} />
        </Col>
        <Col span={4} md={{ span: 4 }}>
          <Button block onClick={() => toggleAddressListVisible(true)}>
            Chỉnh sửa
          </Button>
        </Col>
      </Row>
      <div className='tw-flex tw-justify-end'>
        <Button
          className='tw-bg-primary tw-text-white tw-font-semibold'
          size='large'
          onClick={() => toggleFormVisible(true)}
        >
          Chỉnh sửa thông tin
        </Button>
      </div>

      <div
        className={`tw-absolute ${
          addressListVisible ? 'tw-left-0 tw-opacity-100' : 'tw-left-full tw-opacity-0'
        } tw-transition-all tw-duration-300 tw-top-0 tw-w-full tw-h-full tw-flex tw-flex-col tw-p-6 tw-z-10 tw-bg-white`}
      >
        <Title level={3}>
          <Icon name='LeftOutlined' className='tw-cursor-pointer' onClick={() => toggleAddressListVisible(false)} />
          Danh sách địa chỉ
        </Title>
        <div className='tw-flex-1'>
          <AddressTable />
        </div>
      </div>
      <InfomationForm visible={formVisible} onClose={() => toggleFormVisible(false)} />
    </section>
  )
}

export default Infomation
