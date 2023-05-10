import { ReactElement, useEffect, useState } from 'react'
import { NextPageWithLayout } from '../_app'
import { HomeLayout } from '@/layouts'
import {
  Breadcrumb,
  Button,
  Carousel,
  Col,
  Divider,
  Form,
  Image,
  InputNumber,
  Rate,
  Row,
  Select,
  Skeleton,
  Space,
  Tabs,
  Typography
} from 'antd'
import { ShoppingCartOutlined, ShoppingOutlined } from '@ant-design/icons'
import { config, format3P } from '~/utils'
import { RelativeProduct, UpsellProducts } from '@/modules/common/components/Generals/Products'
import { sizesSelect } from './settings'
import { useAppDispatch } from '@/redux/reduxHooks'
import { CartActions } from '@/redux/actions'
import { ProductType } from '@/interfaces'
import { useParams } from 'react-router-dom'
// import { ProductServices } from '@/modules/common/services'

const { Title, Text, Paragraph } = Typography
const DetailBlog = () => {
  const { id } = useParams()
  const [form] = Form.useForm()
  const [product, setProduct] = useState<ProductType>()
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (id) {
      getProductDetail()
    }
  }, [id])

  const getProductDetail = async () => {
    try {
      // const res = await ProductServices.getDetailProducts({
      //   id: id as string
      // })
      // console.log('res', res)
      // setProduct(res.data)
    } catch (error) {
      console.log('Lỗi chi tiết', error)
    } finally {
      setLoading(false)
    }
  }

  const addItemToCard = (values: any) => {
    const item = {
      id: product?.id,
      name: product?.name,
      price: product?.price,
      quantity: values.quantity,
      image: (product?.photos && product?.photos[0]) || '',
      color: values.color,
      size: values.size
    }
    dispatch(CartActions.addItemToCart(item))
  }

  return (
    <article className='tw-container tw-mb-9'>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Breadcrumb
            className='tw-text-sm tw-py-11'
            items={[
              {
                title: 'Trang chủ',
                href: '/'
              },
              {
                title: 'Sản phẩm',
                href: '/products/'
              },
              {
                title: product?.name
              }
            ]}
          />
        </Col>
        <Col span={24} md={{ span: 9 }}>
          {loading ? (
            <Skeleton.Image className='!tw-w-full !tw-h-full tw-min-h-[350px]' active />
          ) : (
            <Carousel draggable infinite>
              {product?.photos ? (
                product?.photos?.map((image, index) => {
                  return (
                    <Image
                      className='tw-select-none'
                      key={`product-image-${index}`}
                      alt={`product-image-${index}`}
                      width={`100%`}
                      src={image}
                    />
                  )
                })
              ) : (
                <Image src={`${config.publicUrl}/images/products/product1.jpg`} />
              )}
            </Carousel>
          )}

          <div className='tw-grid tw-gap-1 tw-grid-cols-4 tw-mt-2'>
            {product?.photos?.map((image, index) => {
              return (
                <div className='tw-col-span-1' key={`product-image-${index}`}>
                  <Image
                    preview={false}
                    className='tw-select-none'
                    alt={`product-image-${index}`}
                    width={`100%`}
                    src={`${config.publicUrl}/images/products/${image}`}
                  />
                </div>
              )
            })}
          </div>
        </Col>
        <Col span={24} md={{ span: 15 }}>
          <Skeleton loading={loading} active>
            <Space direction='vertical'>
              <Title level={3} className='!tw-mb-0'>
                {product?.name}
              </Title>
              <Rate className='tw-text-sm' />
              <Text className='tw-text-base tw-font-semibold'>{format3P(product?.price)} VNĐ</Text>
              <Paragraph>{product?.description}</Paragraph>
              <Form
                form={form}
                onFinish={(values) => addItemToCard(values)}
                initialValues={{
                  quantity: 1
                }}
              >
                <Form.Item
                  label={<span className='tw-text-sm tw-font-bold'>Màu sắc</span>}
                  name='color'
                  className='tw-flex'
                  required
                  rules={[
                    {
                      required: true,
                      message: 'Chọn ít nhất một màu'
                    }
                  ]}
                >
                  <Select
                    placeholder='Chọn màu sắc'
                    className='!tw-min-w-[70px]'
                    options={[
                      {
                        value: 'color1',
                        label: 'Color1'
                      },
                      {
                        value: 'color2',
                        label: 'Color2'
                      }
                    ]}
                  />
                </Form.Item>
                <Form.Item
                  label={<span className='tw-text-sm tw-font-bold'>Kích thước</span>}
                  name='size'
                  className='tw-flex'
                  required
                  rules={[
                    {
                      required: true,
                      message: 'Chọn ít nhất một kích thước'
                    }
                  ]}
                >
                  <Select className='!tw-min-w-[70px]' options={sizesSelect} />
                </Form.Item>
                <Form.Item
                  label={<span className='tw-text-sm tw-font-bold'>Số lượng</span>}
                  name='quantity'
                  className='tw-flex'
                  required
                >
                  <InputNumber min={1} />
                </Form.Item>
                <Form.Item>
                  <Button
                    htmlType='submit'
                    type='primary'
                    className='tw-bg-primaryOrange tw-text-white tw-font-bold hover:!tw-bg-primaryDark hover:!tw-text-white'
                    size='large'
                    icon={<ShoppingCartOutlined className='tw-text-xl tw-mr-2' />}
                  >
                    Thêm vào giỏ hàng
                  </Button>
                  <Button
                    type='primary'
                    size='large'
                    className='tw-bg-primaryOrange tw-text-white tw-font-bold hover:!tw-bg-primaryDark hover:!tw-text-white tw-ml-3'
                    icon={<ShoppingOutlined className='tw-text-xl tw-mr-2' />}
                  >
                    Thanh toán ngay
                  </Button>
                </Form.Item>
              </Form>
            </Space>
          </Skeleton>
        </Col>
        <Col span={24}>
          <Tabs
            defaultActiveKey='info'
            type='card'
            size={'large'}
            items={[
              {
                label: 'Giới thiệu',
                key: 'info',
                children: `Thong tin chi tiet`,
                forceRender: true
              },
              {
                label: 'Thông tin chi tiết',
                key: 'detail',
                children: `Thong tin chi tiet 2`,
                forceRender: true
              }
            ]}
          />
        </Col>
        <Col span={24}>
          <RelativeProduct />
        </Col>
        <Col span={24}>
          <UpsellProducts />
        </Col>
      </Row>
      <Divider />
    </article>
  )
}

DetailBlog.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>
}
export default DetailBlog
