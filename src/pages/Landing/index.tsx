import React, { ReactElement, useEffect, useState } from 'react'
import {
  TwoColumnBanner,
  Banner,
  BestSellerProducts,
  NewestBlog,
  ProductTabs,
  ThreeColumnBanner
} from '~/components/Home'
import { Layout } from 'antd'

const { Content } = Layout

const LandingPage = () => {
  useEffect(() => {
    document.title = 'Trang chủ - Panther Shop'
  }, [])

  return (
    <Content>
      {/* Banner 1 */}
      <Banner />

      {/* Banner 2 */}
      <ThreeColumnBanner />

      <ProductTabs />

      {/* Banner 3 */}
      <TwoColumnBanner />

      <BestSellerProducts />

      <NewestBlog />
    </Content>
  )
}

export default LandingPage
