import React, { useEffect, useState } from 'react'
import { Carousel, Skeleton } from 'antd'
import { BlogCard } from '../Generals/Blogs'

import type { BlogItemType } from '~/interfaces'
const NewestBlog = () => {
  const [blogs, setBlogs] = useState<BlogItemType[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 5e3)
  }, [])

  const getBlogs = async () => {
    try {
      // const response = await
      // setBlogs()
    } catch (err) {
      console.log(err)
    }
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
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
    <section className='tw-mb-[96px]'>
      <div className='tw-mb-[49px] tw-text-center'>
        <h2 className='tw-text-[36px] tw-text-[#242424] tw-font-semibold tw-mb-[11px] tw-leading-[38px] tw-tracking-tighter'>
          Bài viết mới nhất
        </h2>
        <p>Cập nhật xu thế thời trang</p>
      </div>
      <div className='tw-container tw-border-b tw-border-solid tw-border-stone-300 tw-pb-[95px]'>
        <Carousel draggable {...settings}>
          {loading || !blogs.length
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
            : blogs?.map((blog, index) => <BlogCard {...blog} key={blog.key} />)}
        </Carousel>
      </div>
    </section>
  )
}

export default NewestBlog
