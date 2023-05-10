import React from 'react'
import { config } from '~/utils'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'antd'

interface BannerDataProps {
  key: React.Key
  bgUrlImage: string
  contentUrlImage: string
  title: string
}

const BannerData: BannerDataProps[] = [
  {
    key: 0,
    bgUrlImage: 'slider1.jpg',
    contentUrlImage: 'content1.png',
    title: 'the wooboom clothing summer collection is back at half price'
  },
  {
    key: 1,
    bgUrlImage: 'slider2.jpg',
    contentUrlImage: 'content2.png',
    title: 'the wooboom clothing summer collection is back at half price'
  },
  {
    key: 2,
    bgUrlImage: 'slider3.jpg',
    contentUrlImage: 'content3.png',
    title: 'the wooboom clothing summer collection is back at half price'
  }
]

const ContentImageClass: string[] = [
  'slider-image !tw-w-[720px] tw-mx-[auto] !tw-block tw-animate-zoomIn',
  'slider-image !tw-w-[800px] tw-mx-[auto] !tw-block tw-animate-zoomIn',
  'slider-image !tw-w-[700px] tw-relative tw-top-[-85px] tw-mx-[auto] !tw-block tw-animate-zoomIn'
]

const ContentTextClass: string[] = [
  'slider-caption tw-opacity tw-text-white tw-absolute tw-bottom-[130px] tw-left-0 tw-right-0 tw-text-center tw-m-0 tw-animate-fadeInUp',
  'slider-caption tw-opacity tw-text-white tw-absolute tw-bottom-[110px] tw-left-0 tw-right-0 tw-text-center tw-m-0 tw-animate-fadeInUp',
  'slider-caption tw-opacity tw-text-white tw-absolute tw-bottom-[80px] tw-left-0 tw-right-0 tw-text-center tw-m-0 tw-animate-fadeInUp'
]
function Banner() {
  return (
    <section className='tw-mb-[30px]'>
      <Carousel>
        {BannerData.map((item: BannerDataProps) => {
          return (
            <div id={`slider-${item.key}`} key={item.key} className={`tw-w-full tw-relative`}>
              <div className='tw-w-full tw-h-full tw-absolute tw-top-0 tw-left-0 -tw-z-10'>
                <Image
                  src={`${config.publicUrl}/images/banner/${item.bgUrlImage}`}
                  alt={`background-${item.key}`}
                  preview={false}
                />
              </div>
              <div className='tw-container'>
                <div className='tw-h-[780px] tw-flex tw-items-center'>
                  <div className='tw-flex-1 tw-text-center p-0 tw-relative'>
                    <img
                      className={ContentImageClass[item.key as number]}
                      src={`${config.publicUrl}/images/banner/${item.contentUrlImage}`}
                      alt={`content-${item.key}`}
                    />
                    <p className={ContentTextClass[item.key as number]}>{item.title}</p>
                    <Link
                      className='slider-btn tw-opacity-0 tw-animate-fadeInUp tw-inline-block tw-text-[16px] tw-capitalize tw-pb-[2px] tw-border-b-[2px] tw-border-solid tw-border-white tw-text-white hover:tw-text-[#ff6a28] hover:tw-border-[#ff6a28] tw-transition-all tw-duration-300'
                      to='/san-pham'
                    >
                      Khám Phá Ngay
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </Carousel>
    </section>
  )
}

export default Banner
