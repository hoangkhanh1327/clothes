import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store'
import App from './App'
import { ConfigProvider } from 'antd'
import viVN from 'antd/locale/vi_VN'
import { BrowserRouter } from 'react-router-dom'
import 'antd/dist/reset.css'
import './index.css'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ConfigProvider
    locale={viVN}
    theme={{
      token: {
        fontFamily: 'Libre Franklin, sans-serif'
      }
    }}
  >
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </ConfigProvider>
)
