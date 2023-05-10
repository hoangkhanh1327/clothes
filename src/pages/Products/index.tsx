import { Col, Divider, Row, Typography } from 'antd'
import { Categories, PriceFilter, ProductList, Tags } from '@/modules/common/components/Generals/Products'
const { Title } = Typography
const Products = () => {
  return (
    <div className='tw-container tw-pb-9'>
      <Row gutter={[24, 24]}>
        <Col span={24} lg={{ span: 6 }}>
          <PriceFilter />
          <Categories />
          <Tags />
        </Col>
        <Col span={24} lg={{ span: 16 }}>
          <Title level={2}>Danh sách sản phẩm</Title>
          <ProductList />
        </Col>
      </Row>
      <Divider />
    </div>
  )
}

export default Products
