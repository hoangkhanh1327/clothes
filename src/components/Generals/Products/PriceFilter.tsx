import { Button, Slider, Space, Typography } from 'antd'
import { useState } from 'react'
import { format3P } from '~/utils'

const { Title, Text } = Typography
const PriceFilter = () => {
  const [minPrice, setMinPrice] = useState<number>(0)
  const [maxPrice, setMaxPrice] = useState<number>(100000000)
  return (
    <Space size={[24, 12]} direction='vertical' className='tw-min-w-full tw-mb-10'>
      <Title level={3}>Lọc theo giá</Title>
      <Slider
        min={0}
        max={100000000}
        step={1000000}
        range
        onChange={(value: number[]) => {
          setMinPrice(value[0])
          setMaxPrice(value[1])
        }}
      />
      <Space className='tw-justify-between tw-min-w-full'>
        <Button className='tw-h-[30px] tw-uppercase !tw-rounded-[30px] tw-px-4 tw-leading-[30px] tw-py-0 tw-bg-[#242424] !tw-text-white hover:tw-bg-primaryOrange tw-transition-all tw-duration-300 tw-font-semibold'>
          Lọc Giá
        </Button>

        <Text>
          {format3P(minPrice)} - {format3P(maxPrice)} VNĐ
        </Text>
      </Space>
    </Space>
  )
}

export default PriceFilter
