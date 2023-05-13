import React, { useEffect, useState } from 'react'
import { Carousel } from 'antd'
import { ProductCard, ProductSkeleton } from '../Products'
import { ProductServices } from '../../services'
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
      const res: any = await ProductServices.getProducts({
        page: 1,
        page_size: 5
      })
      setBestSellerProducts(res.data.data)
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }
  const settings = {
    infinite: true,
    slidesToShow: 5,
    speed: 500,
    slidesPerRow: 1,
    slidesToScroll: 5,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  }

  return (
    <Carousel draggable {...settings}>
      {loading || !bestSellerProducts.length
        ? [...Array(6)].map((_, index) => <ProductSkeleton key={`bestseller-product-skeleton-${index}`} />)
        : bestSellerProducts?.map((product, index) => <ProductCard key={`newest-blog-${index}`} {...product} />)}
    </Carousel>
  )
}

export default BestSellerProducts
