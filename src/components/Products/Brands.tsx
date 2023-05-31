import { useEffect } from 'react'
import { Typography } from 'antd'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { getBrandsAsync, productState, setFilters } from '~/redux/reducers/productSlide'

const { Title, Text } = Typography

const Brands = () => {
  const { productBrands, filters } = useAppSelector(productState)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!productBrands.length) {
      dispatch(getBrandsAsync())
    }
  }, [])

  return (
    <div className='xl:tw-mb-[45px]'>
      <Title
        level={2}
        className='tw-text-tertiary tw-text-lg tw-mb-[15px] tw-pb-[5px] tw-capitalize tw-font-semibold tw-leading-6'
      >
        Thương hiệu
      </Title>
      <ul className='tw-list-outside tw-list-none tw-list-image-none tw-m-0 tw-p-0'>
        {productBrands?.map((brand) => {
          const isActive = filters?.brands?.includes(brand)
          return (
            <li
              className='tw-mb-2 tw-cursor-pointer group-[] tw-group'
              key={brand}
              onClick={() => {
                if (isActive) {
                  dispatch(setFilters({ ...filters, brands: filters?.brands.filter((item: string) => item !== brand) }))
                } else {
                  dispatch(setFilters({ ...filters, brands: filters?.brands ? [...filters?.brands, brand] : [brand] }))
                }
              }}
            >
              <Text
                className={`tw-block tw-leading-[27px] tw-duration-300 hover:tw-text-primary ${
                  isActive ? 'tw-text-primary tw-font-semibold' : 'tw-text-tertiary'
                }`}
              >
                {brand}
              </Text>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Brands
