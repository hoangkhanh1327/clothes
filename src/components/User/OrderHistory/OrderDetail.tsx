import { Col, Image, Modal, Row, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
const OrderDetail = ({ open, onClose }: { open: boolean; onClose: Function }) => {
  const columns: ColumnsType<any> = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '#',
      dataIndex: 'name',
      key: 'name',
      render(value, record, index) {
        return <Image preview={false} src={value} alt='' />
      }
    },
    {
      title: 'Thông tin',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: 'Số lượng',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'Thành tiền',
      dataIndex: 'address',
      key: 'address'
    }
  ]
  return (
    <Modal title='Chi tiết đơn hàng' open={open}>
      <Row gutter={24}>
        <Col span={12}>Mã đơn hàng</Col>
        <Col span={12}></Col>

        <Col span={12}>Tên khách hàng</Col>
        <Col span={12}></Col>

        <Col span={12}>Địa chỉ nhận hàng</Col>
        <Col span={12}></Col>

        <Col span={12}>Tổng tiền</Col>
        <Col span={12}></Col>

        <Col span={12}>Trạng thái</Col>
        <Col span={12}></Col>

        <Col span={24}>
          <Table columns={columns} />
        </Col>
      </Row>
    </Modal>
  )
}

export default OrderDetail
