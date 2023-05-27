import { ReactElement, useCallback, useEffect, useRef, useState, useMemo } from 'react'
import {
  Breadcrumb,
  Button,
  Carousel,
  Col,
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
import { format3P } from '~/utils'
import { useParams } from 'react-router-dom'
import { ProductType } from '~/interfaces'
import { CarouselRef } from 'antd/es/carousel'
import { ProductCard } from '~/components/Products'
import { BestSellerProducts } from '~/components/Landing'
import { ProductServices } from '~/services'
import { Icon } from '~/components/Generals'
import { addItemToCartAsync } from '~/redux/reducers/cartSlice'
import { useAppDispatch } from '~/redux/hooks'

interface QuantityType {
  color: string
  detail_id: string
  id: string
  quantity: number
  size: string
}

const { Title, Text, Paragraph } = Typography
const DetailBlog = () => {
  const { id } = useParams()
  const [form] = Form.useForm()
  const [product, setProduct] = useState<ProductType>()
  const [relativeProducts, setRelativeProducts] = useState<ProductType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [sizes, setSizes] = useState<any>()
  const [colors, setColors] = useState<string[]>([])
  const dispatch = useAppDispatch()

  const imgRef = useRef<CarouselRef>(null)
  const colorValue = Form.useWatch('color', form)

  useEffect(() => {
    if (id) {
      getDetailProduct(id)
    }
  }, [id])

  const getDetailProduct = async (id: string) => {
    try {
      setLoading(true)
      const res = await ProductServices.getDetailProduct(id)
      setProduct(res.data)
      handleProductQuantites(res.data?.product_quantities)
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  const handleProductQuantites = (quantites: QuantityType[]) => {
    let colors: string[] = []
    let sizes: any = {}

    quantites.forEach((quantity: QuantityType) => {
      if (!colors.includes(quantity.color)) {
        colors.push(quantity.color)
      }
    })

    colors.map((color: string) => {
      let sizesOfColor = quantites
        .map((quantity: QuantityType) => {
          if (quantity.color === color && quantity.size !== undefined) {
            return quantity.size
          }
        })
        .filter((size: string | undefined) => size !== undefined)
      sizes[color] = sizesOfColor
    })
    setSizes(sizes)
    setColors(colors)
  }

  const calcDiscountPrice = useCallback((originPrice?: number, discountPercent?: number) => {
    if (originPrice) {
      let totalDiscountAmount = 0
      if (discountPercent) {
        totalDiscountAmount += (originPrice * discountPercent) / 100
      }
      return format3P(originPrice - totalDiscountAmount)
    } else {
      return format3P(0)
    }
  }, [])

  const addItemToCard = (values: any) => {
    if (product?.id) {
      const item = {
        product_id: product?.id,
        quantity: values.quantity,
        color: values.color,
        size: values.size
      }
      dispatch(addItemToCartAsync([item]))
    }
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
                href: '/san-pham/'
              },
              {
                title: product?.name
              }
            ]}
          />
        </Col>
        <Col span={24} md={{ span: 8 }}>
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
        <Col span={24} md={{ span: 16 }}>
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
                  {calcDiscountPrice(product?.price, product?.discount_percent)}
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
                    options={colors.map((color) => ({ value: color, label: color }))}
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
                  <Select
                    className='!tw-min-w-[70px]'
                    disabled={!form.getFieldValue('color')}
                    options={
                      colorValue
                        ? sizes[colorValue]?.map((size: string) => ({
                            label: size,
                            value: size
                          }))
                        : []
                    }
                  />
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
                    icon={<Icon name='ShoppingCartOutlined' className='tw-text-xl tw-mr-2' />}
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
