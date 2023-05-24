import { ReactElement, useEffect, useState } from 'react'
import { Breadcrumb, Col, Divider, Row, Typography, Image, Button, Card, Space, Table } from 'antd'

import { OrderTable } from '~/components/User/OrderHistory'
const { Title, Paragraph, Text } = Typography
const OrderHistory = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = 'Lịch sử mua hàng'
    disableLoading()
  }, [])
  const disableLoading = () => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  console.log('loading', loading)
  return (
    <section className='tw-container tw-pb-9 tw-flex tw-flex-col tw-min-h-full tw-gap-4'>
      <div className='tw-min-h-0'>
        <Row gutter={[24, 48]}>
          <Col span={24} lg={{ span: 24 }}>
            <Title className='tw-mt-4' level={3}>
              Lịch sử mua hàng
            </Title>
          </Col>
        </Row>
      </div>
      <div className='tw-flex-1 tw-flex tw-items-stretch'>{!loading && <OrderTable />}</div>
    </section>
  )
}

export default OrderHistory
