import React, { lazy, Suspense, useEffect } from 'react'
import './App.css'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import { authState, getCurrentUserAsync } from './redux/authSlice'
import { history } from './utils'
import { ProtectedRoutes } from './routes'
import { getAccountTypeListAsync } from './redux/reducers/accountSlice'

const HomeLayout = lazy(() => import('./layouts/home.layout'))

const Authentication = lazy(() => import('./pages/Authentication'))

// Errors
const _500 = lazy(() => import('./pages/Errors/_500'))
const _404 = lazy(() => import('./pages/Errors/_404'))
const _403 = lazy(() => import('./pages/Errors/_403'))

const LandingPage = lazy(() => import('./pages/Landing'))

function App() {
  const { user } = useAppSelector(authState)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  history.location = useLocation()
  history.navigate = navigate

  useEffect(() => {
    dispatch(getCurrentUserAsync())
    dispatch(
      getAccountTypeListAsync({
        page: 1,
        pageSize: 1000
      })
    )
  }, [])

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user])

  return (
    <Suspense fallback={<h1>Loading</h1>}>
      <Routes>
        <Route path='/dang-nhap' element={<Authentication />} />

        <Route path='/' element={<HomeLayout />}>
          <Route path='*' element={<_404 />} />
          <Route path='/403' element={<_403 />} />
          <Route path='/500' element={<_500 />} />
          <Route index element={<LandingPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
