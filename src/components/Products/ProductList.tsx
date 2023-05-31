import { useEffect, useState } from 'react'
import { List, Pagination, PaginationProps } from 'antd'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ProductCard from './ProductCard'
import { ProductType } from '~/interfaces'
import 'moment/locale/vi'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { productState, setFilters } from '~/redux/reducers/productSlide'
import { ProductServices } from '~/services'

const BlogList = () => {
  const { filters } = useAppSelector(productState)
  const dispatch = useAppDispatch()
  const [products, setProducts] = useState<ProductType[]>([])
  const [total, setTotal] = useState()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (filters) {
      getProducts(filters)
    } else {
      getProducts({ page: 1, page_size: 8 })
    }
  }, [filters])

  const getProducts = async (params: any) => {
    try {
      setLoading(true)
      const transformedParams = {
        page: params?.page || 1,
        page_size: 12,
        name: params?.name || undefined,
        brands: params?.brands ? params?.brands.join(',') : undefined,
        genders: params.genders || undefined,
        price: params?.price ? params?.price.join(',') : undefined
      }
      const res: any = await ProductServices.getProducts(transformedParams)
      setProducts(res.data || [])
      setTotal(res.total || 0)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

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
        <a href='#'>
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
          current={filters?.page || 1}
          itemRender={itemRender}
          total={total}
          onChange={(page: number) => dispatch(setFilters({ ...filters, page }))}
        />
      }
      renderItem={(item: ProductType) => {
        return <ProductCard product={item} />
      }}
    />
  )
}

export default BlogList
