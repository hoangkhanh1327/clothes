import { ReactElement, useEffect, useState } from 'react'
import { Typography, Spin } from 'antd'
import { WishListTable } from '~/components/User/WishList'
import { getWishList, userState } from '~/redux/reducers/userSlice'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
const { Title, Paragraph, Text } = Typography

const Whistlist = () => {
  const [loading, setLoading] = useState(true)
  const { wishlist } = useAppSelector(userState)
  const dispatch = useAppDispatch()

  useEffect(() => {
    document.title = 'Sản phẩm yêu thích'
    disableLoading()

    if (!wishlist.length) {
      dispatch(getWishList())
    }
  }, [])

  const disableLoading = () => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }
  return (
    <section className='tw-pt-3 tw-px-3 tw-pb-9 tw-flex tw-flex-col tw-min-h-full'>
      <div className='tw-min-h-0'>
        <Title className='' level={4}>
          Sản phẩm yêu thích
        </Title>
      </div>
      <div className='tw-flex-1 tw-flex'>
        <div className='tw-flex-1'>
          {
            <Spin spinning={loading}>
              {' '}
              <WishListTable />{' '}
            </Spin>
          }
        </div>
      </div>
    </section>
  )
}

export default Whistlist
