import { ReactElement, useEffect, useState } from 'react'
import { Typography } from 'antd'

import { OrderDetail, OrderTable } from '~/components/User/OrderHistory'
const { Title, Paragraph, Text } = Typography
const OrderHistory = () => {
  const [loading, setLoading] = useState(true)
  const [orderDetail, setOrderDetail] = useState<string>()
  const [order, setOrder] = useState<any[]>()

  useEffect(() => {
    document.title = 'Lịch sử mua hàng'
    disableLoading()
  }, [])
  const disableLoading = () => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  return (
    <section className='tw-pt-3 tw-px-3 tw-pb-9 tw-flex tw-flex-col tw-min-h-full'>
      <div className='tw-min-h-0'>
        <Title className='' level={4}>
          Lịch sử mua hàng
        </Title>
      </div>
      <div className='tw-flex-1 tw-flex'>
        <div className='tw-flex-1'>{!loading && <OrderTable />}</div>
      </div>
      <OrderDetail />
    </section>
  )
}

export default OrderHistory
