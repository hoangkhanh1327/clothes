import { ReactElement, useEffect, useState } from 'react'
import { Spin, Typography } from 'antd'

import { OrderDetail, OrderTable } from '~/components/User/OrderHistory'
const { Title, Paragraph, Text } = Typography
const OrderHistory = () => {
  const [loading, setLoading] = useState(true)
  const [orderDetail, setOrderDetail] = useState<any>()
  const [order, setOrder] = useState<any[]>([])

  useEffect(() => {
    document.title = 'Lịch sử mua hàng'
    disableLoading()
  }, [])

  const disableLoading = () => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  const onShowOrderDetail = (orderId: string) => {
    const orderExist = order.find((or) => or.id === orderId)
    if (orderExist) {
      setOrderDetail(orderExist)
    }
  }

  return (
    <section className='tw-pt-3 tw-px-3 tw-pb-9 tw-flex tw-flex-col tw-min-h-full'>
      <div className='tw-min-h-0'>
        <Title className='' level={4}>
          Lịch sử mua hàng
        </Title>
      </div>
      <div className='tw-flex-1 tw-flex'>
        <div className='tw-flex-1'>
          {
            <Spin spinning={loading}>
              <OrderTable showDetail={onShowOrderDetail} />{' '}
            </Spin>
          }
        </div>
      </div>
      <OrderDetail open={orderDetail ? true : false} onClose={() => setOrderDetail(null)} />
    </section>
  )
}

export default OrderHistory
