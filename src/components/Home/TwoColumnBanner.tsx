import { config } from '~/utils'
import { Link } from 'react-router-dom'
interface BannerDataProps {
  image: string
}

const BannerData: BannerDataProps[] = [
  {
    image: 'banner11.jpg'
  },
  {
    image: 'banner12.jpg'
  }
]

function TwoColumnBanner() {
  return (
    <section className='tw-px-3'>
      <div className='tw-grid tw-grid-cols-1` lg:tw-grid-cols-2 tw-gap-6 tw-px-[15px] tw-pb-[91px]'>
        {BannerData.map((item: BannerDataProps, index) => {
          return (
            <div key={`two-column-banner-${index}`}>
              <div className='tw-relative hover:after:tw-visible after:tw-invisible after:tw-content-[""] after:tw-w-full after:tw-h-full after:tw-border-[10px] after:tw-border-solid after:tw-border-lightShadow after:tw-absolute after:tw-top-0 after:tw-left-0 tw-transition-all tw-duration-300 '>
                <Link to={'/san-pham'}>
                  <img src={`${config.publicUrl}/images/banner/${item.image}`} alt='' />
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default TwoColumnBanner
