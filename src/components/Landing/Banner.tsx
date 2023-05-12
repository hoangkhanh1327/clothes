import React from 'react'
import { config } from '~/utils'
import { Carousel, Image, Typography } from 'antd'
import { Link } from 'react-router-dom'

const { Title, Paragraph } = Typography
interface BannerDataProps {
  key: React.Key
  bgUrlImage: string
  contentUrlImage: string
  title: string
}

const BannerData: BannerDataProps[] = [
  {
    key: 0,
    bgUrlImage: 'banner1.webp',
    contentUrlImage: 'content1.png',
    title: 'the wooboom clothing summer collection is back at half price'
  },
  {
    key: 1,
    bgUrlImage: 'banner2.webp',
    contentUrlImage: 'content2.png',
    title: 'the wooboom clothing summer collection is back at half price'
  },
  {
    key: 2,
    bgUrlImage: 'banner3.webp',
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
    <Carousel>
      {BannerData.map((item: BannerDataProps) => {
        return (
          <div
            id={`slider-${item.key}`}
            key={item.key}
            className={`tw-w-full tw-relative tw-h-[380px] lg:tw-h-[362px] xl:tw-h-[747px]`}
          >
            <div className='tw-w-full tw-h-full tw-absolute tw-top-0 tw-left-0 -tw-z-10'>
              <img
                className='tw-max-w-full tw-h-auto tw-w-full tw-object-cover'
                src={`${config.publicUrl}/images/banner/${item.bgUrlImage}`}
                alt={`background-${item.key}`}
              />
            </div>
            <div className='tw-table tw-w-full tw-h-full'>
              <div className='tw-table-cell tw-align-middle tw-pl-[90px]'>
                <Title level={2} className='tw-text-xl tw-capitalize tw-text-tertiary tw-font-medium tw-mb-2.5'>
                  top trending
                </Title>
                <Title
                  level={1}
                  className='tw-uppercase tw-text-emerald-[#232323] tw-font-semibold tw-text-[45px] lg:tw-text-[45px] xl:tw-text-[80px] tw-mb-[15px] tw-mt-0'
                >
                  handbag
                </Title>
                <Paragraph className='tw-text-tertiary tw-text-base tw-font-medium tw-pr-[120px] tw-mb-0'>
                  {`Lorem ipsum dolor amet, consectetur adipisicing`} <br />
                  {` elit. Vel similique perspiciatis, tempore unde `}
                </Paragraph>
                <Link
                  className='tw-text-base tw-text-tertiary tw-capitalize tw-mt-[30px] tw-pb-[5px] tw-border-t-0 tw-border-l-0 tw-border-r-0 tw-border-b-2 tw-border-solid tw-border-tertiary tw-font-semibold tw-inline-block hover:tw-text-primary hover:tw-border-primary'
                  to={'/san-pham'}
                >
                  Discover Now
                </Link>
              </div>
            </div>
          </div>
        )
      })}
    </Carousel>
  )
}

export default Banner
