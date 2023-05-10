import { Layout } from 'antd'
import { Sider } from '../components/general'
import { Outlet } from 'react-router-dom'

const HomeLayout = () => {
  return (
    <Layout
      style={{ minHeight: '100vh' }}
      hasSider
      className='tw-h-screen tw-w-screen tw-overflow-hidden'
      id='root-layout'
    >
      <Sider />
      <Layout className='tw-flex-1'>
        {/* <Header /> */}
        <Outlet />
        {/* <Footer /> */}
      </Layout>
    </Layout>
  )
}

export default HomeLayout
