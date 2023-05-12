import React, { useMemo } from 'react'
import { config, format3P } from '~/utils'
import { Link } from 'react-router-dom'
import { Button, Image, Typography } from 'antd'
import { ProductType } from '~/interfaces'

const { Title } = Typography
const ProductCard: React.FC<ProductType> = ({
  id,
  name,
  tags,
  types,
  brand,
  discount_amount,
  discount_percent = 0,
  gender,
  price,
  description,
  photos,
  avr_rate
}) => {
  const costAfterSale = useMemo(() => {
    return price - (price * discount_percent) / 100
  }, [price, discount_percent])
  console.log('photos', discount_percent, discount_amount)
  return (
    <div className='tw-px-3 tw-mb-10 xl:tw-mb-[33px]'>
      <div className='tw-relative tw-mb-[14px]'>
        <div className='tw-relative tw-mb-[14px] tw-group tw-transition-all tw-duration-300 tw-ease-linear'>
          <Link to={`/san-pham/${id}`}>
            <Image
              src={photos?.length ? photos[0] : `${config.publicUrl}/images/products/product2.jpg`}
              alt={name}
              className='tw-block tw-w-full tw-max-w-[100%] tw-h-auto'
              placeholder
              preview={false}
            />
          </Link>

          <Link
            to={`/san-pham/${id}`}
            className='tw-absolute tw-opacity-0 tw-top-0 tw-left-0 tw-invisible group-hover:tw-visible group-hover:tw-opacity-100 tw-transition-all tw-duration-300'
          >
            <Image
              src={photos?.length ? photos[1] : `${config.publicUrl}/images/products/product1.jpg`}
              alt={name}
              className='tw-block tw-w-full tw-max-w-[100%] tw-h-auto'
              preview={false}
            />
          </Link>

          <div className='tw-absolute tw-bottom-[15px] tw-left-[10px] tw-right-[10px] tw-rounded-[3px] tw-opacity-0 tw-invisible tw-transition-all tw-duration-300 group-hover:tw-opacity-100 group-hover:tw-visible'>
            <a
              href='#'
              className='tw-leading-[45px] tw-bg-white tw-text-primary tw-px-[10px] tw-font-normal tw-rounded-sm tw-text-[13px] tw-capitalize tw-w-full tw-block tw-text-center'
            >
              Xem nhanh
            </a>
          </div>

          <div>
            <div className='tw-absolute tw-top-[15px] tw-left-[15px] tw-bg-[#007a58] tw-px-[13px] tw-rounded-sm'>
              <span className='tw-capitalize tw-text-white'>Mới</span>
            </div>
            {discount_percent !== 0 ? (
              <div className='tw-absolute tw-top-[46px] tw-left-[15px] tw-bg-primary tw-px-[15px] tw-rounded-sm'>
                <span className='tw-capitalize tw-text-white tw-text-xs tw-leading-[23px]'>-{discount_percent}%</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div>
        <Title
          level={3}
          className='xl:tw-text-xs tw-leading-[22px] tw-text-[13px] tw-font-normal tw-capitalize tw-mb-0'
        >
          <Link to={`/san-pham/${id}`} className='tw-text-[#999] hover:tw-text-primary tw-duration-300'>
            {name}
          </Link>
        </Title>
        <span className='tw-text-[13px] tw-font-medium tw-text-tertiary'>{format3P(costAfterSale)} VNĐ</span>
        {discount_percent > 0 ? (
          <span className='tw-text-[13px] tw-text-[#a4a4a4] tw-ml-[5px] tw-line-through'>{format3P(price)} VNĐ</span>
        ) : null}
      </div>
    </div>
  )
}

export default ProductCard
