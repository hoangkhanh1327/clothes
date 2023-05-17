import { ReactElement, useCallback, useEffect, useRef, useState } from 'react'
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
// import { RelativeProduct, UpsellProducts } from '@/modules/common/components/Generals/Products'
import { sizesSelect } from '../settings'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '~/redux/hooks'
import { productState } from '~/redux/reducers/productSlide'
import { ProductType } from '~/interfaces'
import { CarouselRef } from 'antd/es/carousel'
import { ProductCard } from '~/components/Products'
import { BestSellerProducts } from '~/components/Landing'
import { ProductServices } from '~/services'
// import { ProductServices } from '@/modules/common/services'

const { Title, Text, Paragraph } = Typography
const DetailBlog = () => {
  const { id } = useParams()
  const [form] = Form.useForm()
  const [product, setProduct] = useState<ProductType>()
  const [relativeProducts, setRelativeProducts] = useState<ProductType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const imgRef = useRef<CarouselRef>(null)

  useEffect(() => {
    if (id) {
      getDetailProduct(id)
    }
  }, [id])

  // useEffect(() => {
  //   if (products.length) {
  //     setRelativeProducts(products.slice(0, 5))
  //   }
  // }, [products])

  const getDetailProduct = async (id: string) => {
    try {
      setLoading(true)
      const res = await ProductServices.getDetailProduct(id)
      console.log('res', res)
      setProduct(res.data)
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  const calcDiscountPrice = useCallback((originPrice?: number, discountAmount?: number, discountPercent?: number) => {
    if (originPrice) {
      let totalDiscountAmount = 0
      if (discountAmount) {
        totalDiscountAmount += discountAmount
      }
      if (discountPercent) {
        totalDiscountAmount += (originPrice * discountPercent) / 100
      }
      return format3P(originPrice - totalDiscountAmount)
    } else {
      return format3P(0)
    }
  }, [])

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
    // dispatch(CartActions.addItemToCart(item))
  }

  return (
    <article className='tw-container '>
      <Row gutter={[24, 0]} className='tw-mb-9'>
        <Col span={24}>
          <Breadcrumb
            className='tw-text-sm tw-py-6'
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
        <Col span={24} md={{ span: 10 }}>
          <div>
            {loading ? (
              <Skeleton.Image className='tw-w-full tw-h-full tw-min-h-[350px]' active />
            ) : (
              <Carousel draggable infinite ref={imgRef}>
                {product?.photos ? (
                  product?.photos?.map((image, index) => {
                    return (
                      <Image
                        className='tw-select-none tw-object-cover'
                        key={`product-image-${index}`}
                        alt={`product-image-${index}`}
                        width={450}
                        height={530}
                        src={image}
                      />
                    )
                  })
                ) : (
                  <Image
                    placeholder
                    className='tw-w-full tw-h-full tw-min-h-[350px] tw-flex tw-items-center tw-justify-center'
                  />
                )}
              </Carousel>
            )}

            <div className='tw-grid tw-gap-1 tw-grid-cols-4 tw-mt-2'>
              {product?.photos?.slice(0, 4)?.map((image, index) => {
                return (
                  <div
                    className='tw-col-span-1'
                    key={`product-image-${index}`}
                    onClick={() => {
                      imgRef?.current?.goTo(index)
                    }}
                  >
                    <Image
                      preview={false}
                      className='tw-select-none tw-object-cover'
                      alt={`product-image-${index}`}
                      width={100}
                      height={120}
                      src={image}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </Col>
        <Col span={24} md={{ span: 14 }}>
          <Skeleton loading={loading} active>
            <div>
              <Title level={1} className='tw-mt-0 tw-text-secondary tw-mb-[14px]'>
                {product?.name}
              </Title>
              <div className='tw-mb-[14px]'>
                <Rate
                  className='tw-text-sm'
                  defaultValue={product?.avr_rate}
                  onChange={() => {
                    console.log('change')
                  }}
                />
              </div>
              <div className='tw-mb-[11px]'>
                <Text className='tw-font-semibold tw-text-primary tw-text-base'>
                  {calcDiscountPrice(product?.price, product?.discount_amount, product?.discount_percent)}
                </Text>
                <Text className='tw-ml-2 tw-text-[13pxs] tw-font-medium tw-line-through'>
                  {format3P(product?.price || 0)} VNĐ
                </Text>
              </div>
              <div className='tw-mb-[11px]'>
                <Paragraph>{product?.description}</Paragraph>
              </div>
            </div>
            <Space direction='vertical'>
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
                    className='tw-bg-primaryDark tw-text-white tw-font-bold hover:tw-bg-primary hover:tw-text-white'
                    size='large'
                    icon={<ShoppingCartOutlined className='tw-text-xl tw-mr-2' />}
                  >
                    Thêm vào giỏ hàng
                  </Button>
                </Form.Item>
              </Form>
            </Space>
          </Skeleton>
        </Col>
      </Row>
      <Row className='tw-mb-[52px]'>
        <Col className='tw-mt-5' span={24}>
          <Tabs
            defaultActiveKey='info'
            type='card'
            size={'large'}
            items={[
              {
                label: 'Giới thiệu',
                key: 'info',
                children: (
                  <div>
                    <Paragraph>{product?.description}</Paragraph>
                  </div>
                ),
                forceRender: true
              },
              {
                label: 'Bình luận',
                key: 'detail',
                children: `Thong tin chi tiet 2`,
                forceRender: true
              }
            ]}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <div className='tw-mb-7 tw-text-center'>
            <Title
              className='tw-text-[36px] tw-text-tertiary tw-font-semibold tw-inline-block tw-mb-[11px] tw-leading-[38px] tw-tracking-tighter'
              level={2}
            >
              Sản phẩm liên quan
            </Title>
            <Paragraph className='tw-mb-0'>Sản phẩm có liên quan</Paragraph>
          </div>
          <div className='tw-grid tw-grid-cols-5 tw-gap-3'>
            {relativeProducts?.map((product) => (
              <div key={`relative-product-${product.id}`} className='tw-col-span-1'>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </Col>
      </Row>
      <section className='lg:tw-mb-8 xl:tw-mb-[46px] tw-border-0 tw-pb-[52px] tw-border-solid tw-border-[#ddd] tw-border-b'>
        <div className='tw-container-fluid'>
          <Row gutter={24}>
            <Col span={24}>
              <div className='tw-text-center tw-mb-7'>
                <Title
                  level={2}
                  className='tw-text-[36px] tw-text-tertiary tw-font-semibold tw-inline-block tw-mb-[11px] tw-leading-[38px] tw-tracking-tighter tw-capitalize'
                >
                  Sản phẩm thịnh hành
                </Title>
                <Paragraph className='tw-mb-0'>Sản phẩm ấn tượng và bán chạy nhất</Paragraph>
              </div>
            </Col>
          </Row>
          <div>
            <div>
              <BestSellerProducts />
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}

export default DetailBlog
