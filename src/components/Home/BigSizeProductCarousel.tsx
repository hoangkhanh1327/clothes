import React, { useState, useEffect } from 'react'
import { ProductCard } from '../Generals/Products'
import { Carousel, Skeleton } from 'antd'
// import { ProductServices } from '../../services'
import { ProductType } from '~/interfaces'

const BigSizeProductCarousel: React.FC<{
  category: string
  isActive: string
}> = ({ category, isActive }) => {
  const [products, setProducts] = useState<ProductType[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    getProducts()
  }, [])
  console.log('?', category, isActive)
  const getProducts = async () => {
    try {
      setLoading(true)
      // const res = await ProductServices.getProducts({
      //   page: 1,
      //   page_size: 10,
      //   genders: category.toUpperCase()
      // })
      // setProducts(res.data)
    } catch (error) {
      console.log('bestSellerProducts', error)
      // dispatch(NotificationActions.setNotification({ }))
    } finally {
      setLoading(false)
    }
  }

  const settings = {
    infinite: true,
    slidesToShow: 4,
    speed: 500,
    rows: 2,
    slidesPerRow: 1,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }

  console.log('products', products)
  return (
    <div>
      <Carousel {...settings} draggable>
        {loading || !products.length
          ? [...Array(10)].map((_, index) => (
              <div key={`blog-skeleton-${index}`} className='tw-p-4'>
                <div className='tw-relative tw-mb-[22px]'>
                  <Skeleton.Image active className='!tw-w-full tw-block tw-max-w-[100%] tw-h-auto tw-min-h-[320px]' />
                </div>
              </div>
            ))
          : products.map((product, index) => {
              return <ProductCard {...product} key={`product-${index}`} />
            })}
      </Carousel>
    </div>
  )
}

export default BigSizeProductCarousel
