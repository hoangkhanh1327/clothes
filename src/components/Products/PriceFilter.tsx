import { Button, Slider, Space, Typography } from 'antd'
import { useState } from 'react'
import { format3P } from '~/utils'

const { Title, Text } = Typography
const PriceFilter = () => {
  const [minPrice, setMinPrice] = useState<number>(0)
  const [maxPrice, setMaxPrice] = useState<number>(100000000)
  return (
    <div className='tw-mb-10'>
      <Title
        level={2}
        className='tw-text-tertiary tw-text-lg tw-mb-[15px] tw-pb-[5px] tw-capitalize tw-font-semibold tw-leading-6'
      >
        Lọc theo giá
      </Title>
      <Slider
        min={0}
        max={100000000}
        step={1000000}
        className='tw-text-primary'
        range
        onChange={(value: number[]) => {
          setMinPrice(value[0])
          setMaxPrice(value[1])
        }}
      />
      <Space className='tw-justify-between tw-items-center tw-min-w-full'>
        <Button className='tw-h-[30px] tw-leading-[30px] tw-py-0 tw-px-4 tw-uppercase tw-rounded-[30px] tw-bg-tertiary tw-text-white hover:tw-bg-primary tw-transition-all tw-duration-300 '>
          Lọc Giá
        </Button>

        <Text>
          {format3P(minPrice)} - {format3P(maxPrice)} VNĐ
        </Text>
      </Space>
    </div>
  )
}

export default PriceFilter