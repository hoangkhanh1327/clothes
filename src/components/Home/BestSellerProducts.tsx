import React, { useEffect, useState } from 'react'
import { Carousel, Skeleton } from 'antd'
import { ProductCard } from '../Generals/Products'
// import { ProductServices } from '../../services'
import { ProductType } from '~/interfaces'
const BestSellerProducts = () => {
  const [bestSellerProducts, setBestSellerProducts] = useState<ProductType[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    getBestSellerProducts()
  }, [])

  const getBestSellerProducts = async () => {
    try {
      setLoading(true)
      // const res = await ProductServices.getProducts({
      //   page: 1,
      //   page_size: 5
      // })
      // setBestSellerProducts(res.data)
      // console.log('res', res)
    } catch (error) {
      console.log('bestSellerProducts', error)
      // dispatch(NotificationActions.setNotification({ }))
    } finally {
      setLoading(false)
    }
  }
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerPadding: '60px',
    swipeToSlide: true,
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

  return (
    <section>
      <div className='tw-mb-[49px] tw-text-center'>
        <h2 className='tw-text-[36px] tw-text-[#242424] tw-font-semibold tw-mb-[11px] tw-leading-[38px] tw-tracking-tighter'>
          Sản phẩm thịnh hành
        </h2>
        <p>Sản phẩm ấn tượng và bán chạy nhất</p>
      </div>
      <div className='tw-container tw-pb-[95px]'>
        <Carousel draggable {...settings}>
          {loading || !bestSellerProducts.length
            ? [...Array(6)].map((_, index) => (
                <div key={`blog-skeleton-${index}`} className='tw-p-4'>
                  <div className='tw-relative tw-mb-[22px]'>
                    <Skeleton.Image active className='!tw-w-full' />
                  </div>
                  <div>
                    <Skeleton active />
                  </div>
                </div>
              ))
            : bestSellerProducts?.map((product, index) => <ProductCard key={`newest-blog-${index}`} {...product} />)}
        </Carousel>
      </div>
    </section>
  )
}

export default BestSellerProducts
