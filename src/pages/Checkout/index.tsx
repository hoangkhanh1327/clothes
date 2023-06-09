import { useEffect, useState, useMemo } from 'react'
import { Breadcrumb, Col, Row, Table, Space, Image, Typography, Button, Tag, Radio, Modal } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { CartItem, UserAddress } from '~/interfaces'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { format3P } from '~/utils'
import type { RadioChangeEvent } from 'antd'
import { AddressSelector } from '~/components/Checkout'
import { getUserAddress, userState } from '~/redux/reducers/userSlice'
import { UserServices } from '~/services'
const { Title, Text } = Typography

const columns: ColumnsType<CartItem> = [
  {
    title: <Text className='tw-uppercase tw-text-secondary tw-text-sm tw-text-center tw-font-semibold'>Hình ảnh</Text>,
    dataIndex: 'image',
    align: 'center',
    key: 'image',
    render: (image) => <Image src={image} alt={``} placeholder={true} preview={false} width={83} height={98} />
  },
  {
    title: <Text className='tw-uppercase tw-text-secondary tw-text-sm tw-text-center tw-font-semibold'>Sản phẩm</Text>,
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: <Text className='tw-uppercase tw-text-secondary tw-text-sm tw-text-center tw-font-semibold'>đơn giá</Text>,
    dataIndex: 'price',
    key: 'price',
    align: 'center',
    render(_value, record, _index) {
      return (
        <Text className='tw-text-secondary tw-min-w-[160px] tw-text-sm tw-font-semibold'>
          {format3P(record.price)} VNĐ
        </Text>
      )
    }
  },
  {
    title: <Text className='tw-uppercase tw-text-secondary tw-text-sm tw-text-center tw-font-semibold'>Thông tin</Text>,
    key: 'info',
    dataIndex: 'info',
    align: 'center',
    render(_value, record, _index) {
      return (
        <Space direction='vertical'>
          <Text className='tw-text-secondary'>
            Kích thước: <span className='tw-uppercase tw-font-semibold'>{record.size}</span>
          </Text>
          <Text className='tw-text-secondary'>
            Màu sắc: <span className='tw-uppercase tw-font-semibold'>{record.color}</span>
          </Text>
        </Space>
      )
    }
  },
  {
    title: <Text className='tw-uppercase tw-text-secondary tw-text-sm tw-text-center tw-font-semibold'>Số lượng</Text>,
    key: 'quantity',
    align: 'center',
    dataIndex: 'quantity'
  },
  {
    title: (
      <Text className='tw-uppercase tw-text-secondary tw-text-sm tw-text-center tw-font-semibold'>thành tiền</Text>
    ),
    dataIndex: 'total',
    align: 'center',
    key: 'total',
    render(_value, record, _index) {
      return (
        <Text className='tw-text-primary tw-min-w-[160px] tw-text-lg tw-font-semibold'>
          {format3P(record.quantity * record.price)} VNĐ
        </Text>
      )
    }
  }
]

const Checkout = () => {
  const [items, setItems] = useState<CartItem[]>([])
  const cart = useAppSelector((state) => state.cart)
  const [paymentMethod, setPaymentMethod] = useState<string>('cod')
  const [addressModalVisibility, setAddressModalVisibility] = useState<boolean>(false)
  const [modal, contextHolder] = Modal.useModal()
  const [currentAddress, setCurrentAddress] = useState<UserAddress>()
  const { address } = useAppSelector(userState)
  const dispatch = useAppDispatch()

  useEffect(() => {
    document.title = 'Thanh toán - Panthers Shop'
    if (!address.length) {
      dispatch(getUserAddress())
    }
  }, [])

  useEffect(() => {
    setItems(cart.items)
  }, [cart.items])

  useEffect(() => {
    console.log('address', address)
    if (address.length) {
      setCurrentAddress(address.find((address) => address.is_default) || address[0])
    } else {
    }
  }, [address])

  const totalProductPrice = useMemo(() => {
    let total = 0
    if (items.length) {
      items.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.price * currentItem.quantity
      }, 0)
    }
    return total
  }, [items])

  const onSelectPaymentMethod = (e: RadioChangeEvent) => {
    setPaymentMethod(e.target.value)
  }

  const handleCheckout = async () => {
    try {
      const params = {
        address_info: '6/1 thanh hoa ho nai 3 trang bom dong nai',
        payment_method: 'ZALO_PAY'
      }
      const res = await UserServices.checkout(params)
    } catch (error) {}
  }

  return (
    <div className='tw-container tw-pb-14'>
      {contextHolder}
      <Breadcrumb
        className='tw-text-sm tw-py-11'
        items={[
          {
            title: 'Trang chủ',
            href: '/',
            className: 'hover:tw-text-primaryOrange'
          },
          { title: 'Thanh toán' }
        ]}
      />
      <Row className='tw-shadow-md tw-pt-7 tw-pb-6 tw-px-[30px]' gutter={[20, 20]}>
        <Col span={24}>
          <Title className='tw-capitalize !tw-text-primary !tw-text-lg !tw-mb-0' level={3}>
            <FontAwesomeIcon icon={faMapMarkerAlt} className='tw-mr-2' />
            Địa chỉ nhận hàng
          </Title>
        </Col>
        <Col span={24}>
          <Space>
            <Text className='tw-text-lg tw-text-secondary tw-font-bold'>{`Trần Quan Tuấn (+84) 902364524`}</Text>
            <Text className='tw-text-lg tw-text-secondary'>
              {`${currentAddress?.address}`}
              {currentAddress?.is_default && (
                <Tag className='tw-text-base' color='magenta'>
                  {` `}Mậc định
                </Tag>
              )}
            </Text>
            <Button className='' size='middle' onClick={() => setAddressModalVisibility(true)}>
              Thay đổi
            </Button>
          </Space>
        </Col>
      </Row>

      <Row className='tw-shadow-md tw-pt-7 tw-pb-6 tw-px-[30px] tw-mt-3' gutter={[20, 20]}>
        <Col span={24}>
          <Title className='tw-capitalize !tw-text-primary !tw-text-lg !tw-mb-0' level={3}>
            Sản phẩm{' '}
          </Title>
        </Col>
        <Col span={24}>
          <Table
            className='tw-border-2 first:!tw-fixedtw-border-b-4'
            columns={columns}
            dataSource={items?.map((item: any) => ({ ...item, key: item.id }))}
            pagination={false}
          />
        </Col>
      </Row>

      <Row className='tw-shadow-md tw-pt-7 tw-pb-6 tw-px-[30px] tw-mt-3' gutter={[20, 20]}>
        <Col span={24}>
          <Title className='tw-capitalize !tw-text-primary !tw-text-lg !tw-mb-0' level={3}>
            Phương thức thanh toán{' '}
          </Title>
        </Col>
        <Col span={24}>
          <Radio.Group onChange={onSelectPaymentMethod} value={paymentMethod}>
            <Space direction='vertical'>
              <Radio value={'cod'}>COD - Thanh toán trực tiếp khi nhận hàng</Radio>
              <Radio value={'zalopay'}>ZaloPay - Thanh toán thông qua kênh ZaloPay</Radio>
            </Space>
          </Radio.Group>
        </Col>
        <Col span={6} offset={18} className=''>
          <Space direction='vertical'>
            <div className='tw-grid tw-grid-cols-2'>
              <Text className='tw-capitalize tw-text-base tw-text-secondary'>Tổng tiền hàng:</Text>
              <Text className='tw-text-right tw-text-base tw-text-secondary tw-font-bold'>{totalProductPrice} VNĐ</Text>
            </div>
            <div className='tw-grid tw-grid-cols-2'>
              <Text className='tw-capitalize tw-text-base tw-text-secondary'>phí vận chuyển:</Text>
              <Text className='tw-text-right tw-text-base tw-text-secondary tw-font-bold'>{totalProductPrice} VNĐ</Text>
            </div>
            <div className='tw-grid tw-grid-cols-2'>
              <Text className='tw-text-lg tw-text-secondary tw-font-bold'>Tổng thanh toán</Text>
              <Text className='tw-text-right tw-text-base tw-text-primary tw-font-bold'>{totalProductPrice} VNĐ</Text>
            </div>
            <Button
              size='large'
              onClick={() => handleCheckout()}
              className='tw-block tw-w-full tw-bg-primary !tw-text-white tw-font-semibold hover:tw-text-white'
            >
              Thanh toán
            </Button>
          </Space>
        </Col>
      </Row>

      <AddressSelector
        addressModalVisibility={addressModalVisibility}
        address={address}
        currentAddress={currentAddress}
        onCloseModal={() => {
          setAddressModalVisibility(false)
        }}
        onConfirm={(value: number | string) => {
          setCurrentAddress(address.find((address) => address.id === value))
          setAddressModalVisibility(false)
        }}
      />
    </div>
  )
}

export default Checkout
