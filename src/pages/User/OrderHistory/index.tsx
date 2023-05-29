import { ReactElement, useEffect, useState } from 'react'
import { Col, Row, Spin, Tabs, Typography } from 'antd'
import type { TabsProps } from 'antd'

import { OrderDetail, OrderTable } from '~/components/User/OrderHistory'
import { UserServices } from '~/services'
const { Title, Text } = Typography
const OrderHistory = () => {
  const [orderDetail, setOrderDetail] = useState<any>()
  const [order, setOrder] = useState<any[]>([])

  useEffect(() => {
    document.title = 'Lịch sử mua hàng'
    getOrders()
  }, [])

  const getOrders = async () => {
    try {
      const res = await UserServices.getOrder({
        off_set: 0,
        limit: 10
      })
      setOrder(res.data)
    } catch (error) {}
  }

  const onShowOrderDetail = (orderId: string) => {
    const orderExist = order.find((or) => or.id === orderId)
    if (orderExist) {
      setOrderDetail(orderExist)
    } else {
      setOrderDetail({
        id: orderId,
        date: new Date(),
        status: 'completed',
        total: 450000,
        custommerName: 'Trần Quang Tuấn',
        items: [
          {
            id: 1,
            key: 1,
            name: 'Clothes 1',
            info: {
              size: 'XXL',
              color: 'BLUE'
            },
            quantity: 2,
            total: 900000
          },
          {
            id: 2,
            key: 2,
            name: 'Clothes 2',
            info: {
              size: 'X',
              color: 'ORAGNE'
            },
            quantity: 1,
            total: 450000
          },
          {
            id: 3,
            key: 3,
            name: 'Clothes 3',
            info: {
              size: 'L',
              color: 'GREEN'
            },
            quantity: 2,
            total: 200000
          },
          {
            id: 4,
            key: 4,
            name: 'Clothes 4',
            info: {
              size: 'XXL',
              color: 'BLUE'
            },
            quantity: 10,
            total: 9000000
          }
        ]
      })
    }
  }

  const items: TabsProps['items'] = [
    {
      key: 'all',
      label: `Tất cả`,
      forceRender: true,
      children: <OrderTable showDetail={onShowOrderDetail} />
    },
    {
      key: 'waiting',
      label: `Chờ thanh toán`,
      forceRender: true,
      children: <OrderTable showDetail={onShowOrderDetail} />
    },
    {
      key: 'completed',
      label: `Hoàn thành`,
      forceRender: true,
      children: <OrderTable showDetail={onShowOrderDetail} />
    },
    {
      key: 'cancelled',
      label: `Đã huỷ`,
      forceRender: true,
      children: <OrderTable showDetail={onShowOrderDetail} />
    }
  ]
  const onChange = (key: string) => {
    console.log(key)
  }

  return (
    <section className='tw-relative tw-p-6 tw-min-h-full tw-flex tw-flex-col'>
      <div className='tw-min-h-0'>
        <Row gutter={24} className='tw-mb-8'>
          <Col span={24}>
            <Title level={3} className='tw-mb-0 tw-font-semibold'>
              Lịch sử mua hàng
            </Title>
          </Col>
          <Col span={24}>
            <Text>Quản lý lịch sử mua hàng</Text>
          </Col>
        </Row>
      </div>
      <div className='tw-flex-1 tw-flex tw-min-h-0'>
        <div className='tw-flex-1'>
          <Tabs
            defaultActiveKey='1'
            rootClassName='fit-height-tabs'
            className='tw-h-full tw-overflow-hidden'
            items={items}
            onChange={onChange}
          />
        </div>
      </div>
      <OrderDetail orderDetail={orderDetail} open={orderDetail ? true : false} onClose={() => setOrderDetail(null)} />
    </section>
  )
}

export default OrderHistory
