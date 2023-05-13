import React, { Fragment, lazy, Suspense, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { history } from './utils'
import './App.css'
import { useAppDispatch } from './redux/hooks'
import { setBreakpoint } from './redux/reducers/appSlice'
import { Grid } from 'antd'
const { useBreakpoint } = Grid

const HomeLayout = lazy(() => import('./layouts/home.layout'))
const PageLayout = lazy(() => import('./layouts/page.layout'))

const Authentication = lazy(() => import('./pages/Authentication'))

// Errors
const _500 = lazy(() => import('./pages/Errors/_500'))
const _404 = lazy(() => import('./pages/Errors/_404'))
const _403 = lazy(() => import('./pages/Errors/_403'))

// LandingPage
const LandingPage = lazy(() => import('./pages/Landing'))

// ProductPage
const ProductsPage = lazy(() => import('./pages/Products'))
const DetailProductPage = lazy(() => import('./pages/Products/DetailProduct'))

const AboutUsePage = lazy(() => import('./pages/AboutUs'))
const ContactUsPage = lazy(() => import('./pages/Contact'))

function App() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const screens = useBreakpoint()
  history.location = useLocation()
  history.navigate = navigate
  useEffect(() => {
    getDeviceBreakPoint(screens)
  }, [screens])

  const getDeviceBreakPoint = (screens: any) => {
    let theMaxBreakPoint = 'xs'
    let isMobileView = true
    const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl']

    breakpoints.forEach((breakpoint) => {
      if (screens[breakpoint]) {
        theMaxBreakPoint = breakpoint
      }
    })

    if (['lg', 'xl', 'xxl'].includes(theMaxBreakPoint)) {
      isMobileView = false
    }
    dispatch(
      setBreakpoint({
        currentBreakpoint: theMaxBreakPoint,
        isMobileView
      })
    )
  }

  return (
    <Suspense fallback={<h1>Loading</h1>}>
      <Routes>
        <Route path='/dang-nhap' element={<Authentication />} />

        <Route path='/' element={<HomeLayout />}>
          <Route index element={<LandingPage />} />
          <Route path='/gioi-thieu' element={<AboutUsePage />} />
          <Route path='/lien-he' element={<ContactUsPage />} />
        </Route>

        <Route path='/' element={<PageLayout />}>
          <Route path='/san-pham' element={<ProductsPage />} />
          <Route path='/san-pham/:id' element={<DetailProductPage />} />
        </Route>

        <Route path='*' element={<_404 />} />
        <Route path='/403' element={<_403 />} />
        <Route path='/500' element={<_500 />} />
      </Routes>
    </Suspense>
  )
}

export default App
