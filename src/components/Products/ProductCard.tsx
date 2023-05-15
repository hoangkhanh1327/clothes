import React, { useMemo } from 'react'
import { config, format3P } from '~/utils'
import { Link } from 'react-router-dom'
import { Button, Image, Typography } from 'antd'
import { ProductType } from '~/interfaces'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { setQuickViewProduct } from '~/redux/reducers/productSlide'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBasketShopping, faHeart, faPlus } from '@fortawesome/free-solid-svg-icons'
import { addItemToCart } from '~/redux/reducers/cartSlice'
import { addItemToWishlistAsync, removeItemFromWishlistAsync, userState } from '~/redux/reducers/userSlice'

const { Title, Text } = Typography
const ProductCard: React.FC<ProductType> = (product) => {
  const {
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
  } = product
  const dispatch = useAppDispatch()
  const { wishlist } = useAppSelector(userState)

  const isWishedItem = useMemo(() => {
    return wishlist.find((item) => item.product_id === id) ? true : false
  }, [wishlist])

  const costAfterSale = useMemo(() => {
    return price - (price * discount_percent) / 100
  }, [price, discount_percent])
  return (
    <div className='tw-px-3 tw-mb-10 xl:tw-mb-[33px]' data-test='product-card'>
      <div
        className='tw-relative tw-mb-[14px] tw-group/product tw-transition-all tw-duration-300 tw-ease-linear'
        data-test='product-thumb'
      >
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
          className='tw-absolute tw-opacity-0 tw-top-0 tw-left-0 tw-invisible group-hover/product:tw-visible group-hover/product:tw-opacity-100 tw-transition-all tw-duration-300'
        >
          <Image
            src={photos?.length ? photos[1] : `${config.publicUrl}/images/products/product1.jpg`}
            alt={name}
            className='tw-block tw-w-full tw-max-w-[100%] tw-h-auto'
            preview={false}
          />
        </Link>

        <div
          className='tw-absolute tw-top-2 tw-right-2 tw-duration-300 tw-transition-all tw-opacity-0 tw-invisible group-hover/product:tw-opacity-100 group-hover/product:tw-visible tw-group/action tw-cursor-pointer hover:tw-bg-black'
          data-test='produc-action'
        >
          <div className='tw-relative' data-item='hover-action'>
            <Text className='tw-w-[50px] tw-h-[50px] tw-text-center tw-leading-[50px] tw-bg-white tw-text-[15px] tw-block tw-text-[#999]'>
              <FontAwesomeIcon icon={faPlus} />
            </Text>
            <div className='tw-absolute tw-top-0 tw-left-0 tw-z-10 tw-max-h-0 tw-transition-all tw-duration-300 tw-opacity-0 tw-invisible group-hover/action:tw-opacity-100 group-hover/action:tw-visible'>
              <ul className='tw-list-outside tw-list-image-none tw-list-none tw-p-0 tw-m-0'>
                <li
                  className='tw-list-item'
                  onClick={() => {
                    dispatch(
                      addItemToCart({
                        id,
                        name,
                        price,
                        quantity: 1,
                        image: photos ? photos[0] : '',
                        size: 'M',
                        color: 'color',
                        discount_amount,
                        discount_percent
                      })
                    )
                  }}
                >
                  <Text className='product-action'>
                    <FontAwesomeIcon icon={faBasketShopping} />
                  </Text>
                </li>
                <li
                  onClick={() => {
                    if (isWishedItem) {
                      dispatch(removeItemFromWishlistAsync([id]))
                    } else {
                      dispatch(addItemToWishlistAsync(id))
                    }
                  }}
                >
                  <Text className={`product-action ${isWishedItem ? 'tw-text-primary' : ''}`}>
                    <FontAwesomeIcon icon={faHeart} />
                  </Text>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className='tw-absolute tw-bottom-[15px] tw-left-[10px] tw-right-[10px] tw-rounded-[3px] tw-opacity-0 tw-invisible tw-transition-all tw-duration-300 group-hover/product:tw-opacity-100 group-hover/product:tw-visible'>
          <a
            href='#'
            className='tw-leading-[45px] tw-bg-white tw-text-primary tw-px-[10px] tw-font-normal tw-rounded-sm tw-text-[13px] tw-capitalize tw-w-full tw-block tw-text-center'
            onClick={() => dispatch(setQuickViewProduct(product))}
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
