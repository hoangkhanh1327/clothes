import React, { useMemo } from 'react'
import { config, format3P } from '~/utils'
import { Link } from 'react-router-dom'
import { Image } from 'antd'
import { ProductType } from '~/interfaces'

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

  return (
    <div className='tw-m-4'>
      <div className='tw-relative tw-mb-[14px]'>
        <div className='tw-relative tw-mb-[14px] tw-group tw-transition-all tw-duration-300 tw-ease-linear'>
          {discount_percent > 0 ? (
            <div className='tw-absolute tw-top-[15px] tw-left-[15px] tw-bg-primaryOrange tw-px-3 text-sm leading-[24px] tw-text-white'>
              -{discount_percent}%
            </div>
          ) : null}
          <div className='tw-transition-all tw-duration-300 tw-ease-linear'>
            <Image
              src={`${config.publicUrl}/images/products/product2.jpg`}
              alt={name}
              className='tw-block tw-w-full tw-max-w-[100%] tw-h-auto'
              placeholder
            />
          </div>

          <div className='tw-absolute tw-top-0 tw-left-0 tw-w-full tw-h-full tw-invisible tw-opacity-0 group-hover:tw-visible group-hover:tw-opacity-100 tw-transition-all tw-duration-300 tw-ease-linear'>
            <Image
              src={`${config.publicUrl}/images/products/product1.jpg`}
              alt={name}
              className='tw-block tw-w-full tw-max-w-[100%] tw-h-auto'
            />
          </div>

          <div className='tw-absolute tw-bottom-[15px] tw-left-[10px] tw-right-[10px] tw-rounded-[3px] tw-opacity-0 tw-invisible tw-transition-all tw-duration-300 group-hover:tw-opacity-100 group-hover:tw-visible'>
            <Link
              to={`/san-pham/${id}`}
              title='Xem sản phẩm'
              className='tw-leading-[45px] tw-color-[#999] tw-bg-[#fff] tw-px-[10px] tw-font-normal tw-rounded-sm tw-text-[13px] tw-capitalize tw-w-full tw-block tw-text-center hover:tw-text-[#ff6a28]'
            >
              Xem sản phẩm
            </Link>
          </div>
        </div>
      </div>
      <div>
        <h3 className='tw-leading-[22px] tw-text-[13px] tw-font-normal tw-capitalize tw-mb-0'>
          <Link to={`/san-pham/${id}`} className='tw-text-[#999]'>
            {name}
          </Link>
        </h3>
        <span className='tw-text-[13px] tw-font-medium tw-text-[#242424]'>{format3P(costAfterSale)} VNĐ</span>
        {discount_percent > 0 ? (
          <span className='tw-text-[13px] tw-text-[#a4a4a4] tw-ml-[5px] tw-line-through'>{format3P(price)} VNĐ</span>
        ) : null}
      </div>
    </div>
  )
}

export default ProductCard
