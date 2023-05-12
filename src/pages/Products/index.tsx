import { Col, Divider, Input, Row, Typography } from 'antd'
import { Fragment, useRef } from 'react'
import { Breadcrumb, Icon } from '~/components/Generals'
import { PriceFilter, Categories, Tags, ProductList } from '~/components/Products'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { productState, setFilters } from '~/redux/reducers/productSlide'
import type { InputRef } from 'antd'

const { Title } = Typography

const Products = () => {
  const { filters } = useAppSelector(productState)
  const dispatch = useAppDispatch()
  const searchRef = useRef<InputRef>(null)

  const handleStartSearch = () => {
    dispatch(
      setFilters({
        ...filters,
        keyword: searchRef.current?.input?.value
      })
    )
  }

  console.log('filters', filters)
  return (
    <Fragment>
      <div className='xl:tw-py-10'>
        <div className='tw-container'>
          <Breadcrumb />
        </div>
      </div>
      <div className='tw-container tw-pb-9'>
        <Row gutter={[24, 24]}>
          <Col span={24} lg={{ span: 6 }}>
            <div>
              <PriceFilter />
              <Categories />
              <Tags />
            </div>
          </Col>
          <Col span={24} lg={{ span: 18 }}>
            <div className='tw-mb-5'>
              <Title
                className='tw-text-tertiary tw-text-[33px] tw-capitalize tw-mb-0 tw-leading-tight tw-font-bold'
                level={1}
              >
                Danh sách sản phẩm
              </Title>
            </div>
            <div className='tw-mb-10'>
              <div className='tw-w-[540px] tw-mx-auto tw-relative'>
                <Input
                  ref={searchRef}
                  placeholder='Nhập tên sản phẩm'
                  defaultValue={filters?.keyword}
                  size='large'
                  suffix={<Icon name='SearchOutlined' />}
                  className=' tw-rounded-[50px]'
                  onPressEnter={handleStartSearch}
                />
              </div>
            </div>
            <ProductList />
          </Col>
        </Row>
        <Divider />
      </div>
    </Fragment>
  )
}

export default Products