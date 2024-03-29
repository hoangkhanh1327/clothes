import { Col, Image, Modal, Row, Space, Table, Tag, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { render } from 'react-dom'
import { Icon } from '~/components/Generals'
import { format3P } from '~/utils'
const { Text, Title } = Typography
const OrderDetail = ({ open, onClose, orderDetail }: { open: boolean; onClose: Function; orderDetail: any }) => {
  const columns: ColumnsType<any> = [
    {
      title: 'Sản phẩm',
      dataIndex: 'name',
      key: 'name',
      render(_value, _record, _index) {
        return (
          <Space>
            <Image
              placeholder
              width={70}
              height={100}
              src={_record?.product_detail?.photos ? _record.product_detail?.photos[0] : ''}
              alt='Product Image'
            />
            <Text>{_record.product_detail.name}</Text>
          </Space>
        )
      }
    },
    {
      title: 'Thông tin',
      dataIndex: 'info',
      key: 'info',
      render(_value, _record, _index) {
        return (
          <Space direction='vertical'>
            <Text>Màu sắc: {_record?.color}</Text>
            <Text>Kích thước: {_record?.size}</Text>
          </Space>
        )
      }
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity'
    },
    {
      title: 'Thành tiền',
      dataIndex: 'total',
      key: 'total',
      render(_value, _record, _index) {
        return (
          <Space direction='vertical'>
            <Text>
              {_record?.quantity * (_record?.product_detail.price * (1 - _record?.product_detail.discount_percent))}đ
            </Text>
          </Space>
        )
      }
    }
  ]
  return (
    <Modal
      title={<Title level={2}>Chi tiết đơn hàng </Title>}
      width={`70vw`}
      open={open}
      onCancel={() => onClose()}
      okButtonProps={{ className: 'tw-text-white tw-bg-primary' }}
      cancelButtonProps={{ className: 'hover:tw-border-primary hover:tw-text-primary' }}
    >
      <Row gutter={24} className='tw-mb-2'>
        <Col span={24} md={{ span: 4 }}>
          <Title level={5} className='tw-mb-0'>
            Mã đơn hàng
          </Title>
        </Col>
        <Col span={24} md={{ span: 20 }}>
          <div className='tw-flex tw-h-full tw-items-end'>
            <Text className='tw-text-tertiary'>{orderDetail?.id}</Text>
          </div>
        </Col>
      </Row>
      {/* <Row className='tw-mb-2'>
        <Col span={24} md={{ span: 4 }}>
          <Title level={5} className='tw-mb-0'>
            Tên khách hàng
          </Title>
        </Col>
        <Col span={24} md={{ span: 20 }}>
          <div className='tw-flex tw-h-full tw-items-end'>
            <Text className='tw-text-tertiary'>{orderDetail?.custommerName}</Text>
          </div>
        </Col>
      </Row> */}
      <Row className='tw-mb-2'>
        <Col span={24} md={{ span: 4 }}>
          <Title level={5} className='tw-mb-0'>
            Địa chỉ nhận hàng
          </Title>
        </Col>
        <Col span={24} md={{ span: 20 }}>
          <div className='tw-flex tw-h-full tw-items-end'>
            <Text className='tw-text-tertiary'>{orderDetail?.address}</Text>
          </div>
        </Col>
      </Row>
      <Row className='tw-mb-2'>
        <Col span={24} md={{ span: 4 }}>
          <Title level={5} className='tw-mb-0'>
            Tổng tiền
          </Title>
        </Col>
        <Col span={24} md={{ span: 20 }}>
          <div className='tw-flex tw-h-full tw-items-end'>
            <Text className='tw-text-tertiary'>{format3P(orderDetail?.total)}đ</Text>
          </div>
        </Col>
      </Row>
      <Row className='tw-mb-2'>
        <Col span={24} md={{ span: 4 }}>
          <Title level={5} className='tw-mb-0'>
            Phương thức thanh toán
          </Title>
        </Col>
        <Col span={24} md={{ span: 20 }}>
          <div className='tw-flex tw-h-full tw-items-end'>
            <Text className='tw-text-tertiary'>
              {orderDetail?.payment_info.payment_method === 'COD'
                ? 'Thanh toán trực tiếp khi nhận hàng (COD).'
                : 'Thanh toán trưc tuyến qua ZaloPay.'}
            </Text>
          </div>
        </Col>
      </Row>
      <Row className='tw-mb-2'>
        <Col span={24} md={{ span: 4 }}>
          <Title level={5} className='tw-mb-0'>
            Trạng thái
          </Title>
        </Col>
        <Col span={24} md={{ span: 20 }}>
          <div className='tw-flex tw-h-full tw-items-end'>
            <Text>
              {orderDetail?.status === 'waiting' ? (
                <Tag color='warning' className='tw-text-sm' icon={<Icon name='SyncOutlined' spin />}>
                  Đang chờ
                </Tag>
              ) : orderDetail?.status === 'error' ? (
                <Tag color='error' className='tw-text-sm' icon={<Icon name='ExclamationCircleOutlined' spin />}>
                  Đã huỷ
                </Tag>
              ) : (
                <Tag color='success' className='tw-text-sm' icon={<Icon name='CheckCircleOutlined' />}>
                  Đã thanh toán
                </Tag>
              )}
            </Text>
          </div>
        </Col>
      </Row>
      <Row className='tw-mb-2'>
        <Col span={24}>
          <Title level={5} className='tw-mb-2'>
            Chi tiết đơn hàng
          </Title>
        </Col>
        <Col span={24}>
          <Table
            columns={columns}
            scroll={{
              y: 330
            }}
            dataSource={orderDetail?.items || []}
          />
        </Col>
      </Row>
    </Modal>
  )
}

export default OrderDetail
