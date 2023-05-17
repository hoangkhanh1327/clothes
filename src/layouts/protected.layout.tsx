import { Button, Col, Layout, Row } from 'antd'
import { useLayoutEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Header, Footer } from '~/components'
import { Icon } from '~/components/Generals'
import { ProtectedSider } from '~/components/Generals/Sider'
const ProtectedLayout = () => {
  const [showStickyHeader, setShowStickyHeader] = useState<boolean>(false)

  useLayoutEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleScroll = (e: Event) => {
    if (window.scrollY > 100) {
      setShowStickyHeader(true)
    } else {
      setShowStickyHeader(false)
    }
  }
  return (
    <Layout id='root-layout'>
      <Layout className='tw-block tw-bg-white'>
        <Header showSearchBar={false} />
        <div className='tw-container tw-py-10'>
          <Row gutter={24}>
            <Col span={6}>
              <ProtectedSider />
            </Col>
            <Col span={18}>
              <Outlet />
            </Col>
          </Row>
        </div>
        <Footer />
      </Layout>
      {showStickyHeader ? (
        <Button
          icon={<Icon name='UpOutlined' />}
          onClick={() =>
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: 'smooth'
            })
          }
          shape='circle'
          size='large'
          className='tw-fixed tw-z-[2147483647] tw-bottom-[85px] tw-text-lg tw-cursor-pointer tw-h-[45px] tw-bg-black tw-text-white tw-right-[12px] tw-text-center'
        />
      ) : null}
    </Layout>
  )
}

export default ProtectedLayout
