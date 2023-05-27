import { useEffect } from 'react'
import { Typography } from 'antd'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { getCategoriesAsync, productState, setFilters } from '~/redux/reducers/productSlide'

const { Title, Text } = Typography

const Categories = () => {
  const { productCategories, filters } = useAppSelector(productState)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!productCategories.length) {
      dispatch(getCategoriesAsync({ page: 1, page_size: 1000 }))
    }
  }, [])

  return (
    <div className='xl:tw-mb-[45px]'>
      <Title
        level={2}
        className='tw-text-tertiary tw-text-lg tw-mb-[15px] tw-pb-[5px] tw-capitalize tw-font-semibold tw-leading-6'
      >
        Danh mục sản phẩm
      </Title>
      <ul className='tw-list-outside tw-list-none tw-list-image-none tw-m-0 tw-p-0'>
        {productCategories?.map((category) => {
          const isActive = filters?.genders === category.value
          return (
            <li
              className='tw-mb-2 tw-cursor-pointer group-[] tw-group'
              key={category.id}
              onClick={() => {
                dispatch(setFilters({ ...filters, genders: category.value }))
              }}
            >
              <Text
                className={`tw-block tw-leading-[27px] tw-duration-300 hover:tw-text-primary ${
                  isActive ? 'tw-text-primary tw-font-semibold' : 'tw-text-tertiary'
                }`}
              >
                {category.name}
              </Text>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Categories
