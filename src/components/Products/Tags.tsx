import { useEffect } from 'react'
import { Tag, Typography } from 'antd'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { getProductTagsAsync, productState } from '~/redux/reducers/productSlide'
const { Title } = Typography

const Tags = () => {
  const dispatch = useAppDispatch()
  const { productTags } = useAppSelector(productState)

  useEffect(() => {
    if (!productTags.length) {
      dispatch(getProductTagsAsync({ page: 1, page_size: 1000 }))
    }
  }, [productTags])

  return (
    <div className=''>
      <Title
        level={2}
        className='tw-text-tertiary tw-text-lg tw-mb-[15px] tw-pb-[5px] tw-capitalize tw-font-semibold tw-leading-6'
      >
        Tags
      </Title>

      <div className='tw-flex tw-flex-wrap'>
        {productTags?.map((tag) => (
          <Tag
            key={tag}
            className='tw-py-[5px] tw-px-[20px] tw-border tw-border-solid tw-border-[#ddd] tw-text-sm tw-capitalize tw-rounded-[20px] tw-mb-3'
          >
            {tag}
          </Tag>
        ))}
      </div>
    </div>
  )
}

export default Tags
