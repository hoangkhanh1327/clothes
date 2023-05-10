import { useEffect, useRef } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Button, Col, Layout, Row, Space, Typography, InputRef, Input } from 'antd'
import { AccountsList, AccountForm } from '../../components/Account'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import {
  getAccountListAsync,
  getAccountTypeListAsync,
  setFilters,
  toggleFormVisible
} from '../../redux/reducers/accountSlice'
import { ListParams } from '../../interfaces/common.interfaces'
import AccountTypeForm from '../../components/Account/AccountTypeForm'
import { Icon } from '../../components/general'

const { Content } = Layout
const { Title } = Typography

const AccountDashboard = () => {
  const dispatch = useAppDispatch()
  const { filters, accountTypes } = useAppSelector((state) => state.account)
  const [searchParams, setSearchParams] = useSearchParams()
  const { type } = useParams()

  const inputRef = useRef<InputRef>(null)

  useEffect(() => {
    document.title = `Tài khoản`
    if (!accountTypes.length) {
      dispatch(
        getAccountTypeListAsync({
          page: 1,
          pageSize: 10000
        })
      )
    }
  }, [])

  useEffect(() => {
    const accountType = accountTypes.find((accountType) => accountType.name.toLowerCase() === type?.toLowerCase())
    if (accountType) {
      dispatch(
        setFilters({
          ...filters,
          accountTypeId: accountType.id
        })
      )
    } else {
      dispatch(
        setFilters({
          ...filters,
          accountTypeId: undefined
        })
      )
    }
  }, [type])

  useEffect(() => {
    handleParseParams()
  }, [searchParams])

  useEffect(() => {
    if (filters) {
      dispatch(getAccountListAsync(filters as ListParams))
    }
  }, [filters])

  const handleParseParams = () => {
    const params: { [key: string]: string | number } = {}
    searchParams.forEach((value, key: keyof typeof params) => {
      params[key] = !isNaN(parseInt(value)) ? parseInt(value) : value
    })

    // Check some require parameters
    if (!params['page']) {
      params['page'] = 1
    }

    if (!params['pageSize']) {
      params['pageSize'] = 11
    }

    if (!params['status']) {
      params['status'] = 'active'
    }
    dispatch(setFilters(params))
  }

  const handleSearch = () => {
    const searchText = inputRef.current?.input?.value || ''
    searchParams.set('keyword', searchText)
    searchParams.set('page', '1')
    setSearchParams(searchParams)
  }

  return (
    <Content className='tw-my-3 tw-mx-4 tw-bg-white tw-p-3 tw-rounded-lg'>
      <div className='tw-flex tw-flex-col tw-h-full tw-w-full'>
        <Row gutter={[12, 12]} className='tw-mb-4'>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <Title level={3} className='tw-my-0'>
              Danh sách tài khoản
            </Title>
          </Col>
          <Col span={24} md={{ span: 12 }} lg={{ span: 16 }}>
            <Space align='center' className='tw-w-full tw-justify-end'>
              <Input
                ref={inputRef}
                style={{
                  borderRadius: 50,
                  color: '##B5B5B5',
                  border: '1px solid #B5B5B5',
                  paddingLeft: '12px'
                }}
                size='middle'
                suffix={
                  <Icon
                    name='SearchOutlined'
                    className={`tw-cursor-pointer hover:tw-scale-125 tw-font-bold tw-transition-all tw-duration-200 `}
                    style={{
                      color: '#333'
                    }}
                  />
                }
                defaultValue={searchParams.get('keyword') || ''}
                placeholder='Tìm kiếm ...'
                type='input'
                bordered={false}
                onPressEnter={handleSearch}
              />
              <Button
                title='Tạo mới tài khoản'
                type='primary'
                size='middle'
                className='tw-bg-primary'
                onClick={() => dispatch(toggleFormVisible({ visible: true }))}
              >
                Thêm tài khoản
              </Button>
            </Space>
          </Col>
        </Row>
        <div className='tw-flex-1'>
          <AccountsList />
        </div>
      </div>
      <AccountForm />
      <AccountTypeForm />
    </Content>
  )
}

export default AccountDashboard
