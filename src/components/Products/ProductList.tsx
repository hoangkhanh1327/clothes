import { useEffect, useState } from 'react'
import { List, Pagination, PaginationProps } from 'antd'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ProductCard from './ProductCard'
import { ProductType } from '~/interfaces'
import 'moment/locale/vi'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { getProductAsync, productState } from '~/redux/reducers/productSlide'

const BlogList = () => {
  const { filters, products, loading } = useAppSelector(productState)
  const dispatch = useAppDispatch()
  const [page, setPage] = useState<number>(1)

  useEffect(() => {
    dispatch(getProductAsync(filters))
  }, [filters])

  const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
    if (type === 'prev') {
      return (
        <a href='##'>
          <FontAwesomeIcon icon={faArrowLeft} />
        </a>
      )
    }
    if (type === 'next') {
      return (
        <a href='##'>
          <FontAwesomeIcon icon={faArrowRight} />
        </a>
      )
    }
    return originalElement
  }

  return (
    <List
      header={false}
      loading={loading}
      dataSource={products}
      itemLayout='vertical'
      grid={{ gutter: 24, column: 4 }}
      footer={
        <Pagination
          className='tw-text-center tw-py-2 tw-border tw-rounded-sm'
          current={page}
          itemRender={itemRender}
          total={0}
          onChange={(page: number) => setPage(page)}
        />
      }
      renderItem={(item: ProductType) => {
        return <ProductCard {...item} />
      }}
    />
  )
}

export default BlogList
