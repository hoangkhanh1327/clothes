import { Tabs } from 'antd'
import BigSizeProductCarousel from './BigSizeProductCarousel'
import { useState } from 'react'

function ProductTabs() {
  const [activeKey, setActiveKey] = useState<string>('women')
  return (
    <section className='tw-px-3'>
      <div className='tw-container'>
        <div className='tw-mb-[49px] tw-text-center'>
          <h2 className='tw-text-[36px] tw-text-[#242424] tw-font-semibold tw-mb-[11px] tw-leading-[38px] tw-tracking-tighter'>
            Sản phẩm của chúng tôi
          </h2>
          <p>Các sản phẩm thiết kế hiện đại nhất, mới nhất</p>
        </div>
        <Tabs
          onChange={(activeKey) => setActiveKey(activeKey)}
          activeKey={activeKey}
          centered
          items={[
            {
              label: 'Đàn ông',
              key: 'men',
              children: <BigSizeProductCarousel />
            },
            {
              label: 'Trẻ em',
              key: 'kid',
              children: <BigSizeProductCarousel />
            },
            {
              label: 'Phụ nữ',
              key: 'women',
              children: <BigSizeProductCarousel />
            }
          ]}
        />
      </div>
    </section>
  )
}

export default ProductTabs
