import React, { useCallback, useState } from 'react'
import { Button, Col, Form, InputNumber, Modal, Row, Select, Typography, Image } from 'antd'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { productState, setQuickViewProduct } from '~/redux/reducers/productSlide'
import { format3P } from '~/utils'
import { sizesSelect } from '~/pages/Products/settings'
import { Icon } from '../Generals'

const { Title, Text, Paragraph } = Typography
const QuickViewProduct = () => {
  const [form] = Form.useForm()
  const { quickViewProduct } = useAppSelector(productState)
  const dispatch = useAppDispatch()
  const [indexImage, setIndexImage] = useState<number>(0)

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

  return (
    <Modal
      title={false}
      open={quickViewProduct ? true : false}
      footer={false}
      closable
      width={1000}
      onCancel={() => dispatch(setQuickViewProduct(undefined))}
    >
      <div className='tw-container'>
        <Row gutter={24}>
          <Col span={24} md={{ span: 10 }}>
            <div>
              <div>
                <div>
                  <Image src={quickViewProduct?.photos[indexImage]} placeholder width={355} height={417} />
                </div>
                <div className='tw-grid tw-gap-1 tw-grid-cols-4 tw-mt-2 tw-cursor-pointer'>
                  {quickViewProduct?.photos?.slice(0, 4)?.map((image, index) => {
                    return (
                      <div
                        className='tw-col-span-1'
                        key={`product-image-${index}`}
                        onClick={() => setIndexImage(index)}
                      >
                        <Image
                          preview={false}
                          className='tw-select-none'
                          alt={`product-image-${index}`}
                          width={`86px`}
                          height={`100px`}
                          src={image}
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </Col>
          <Col span={24} md={{ span: 14 }}>
            <div>
              <div className=''>
                <Title
                  level={2}
                  className='tw-text-base tw-uppercase tw-font-semibold tw-mb-[14px] tw-text-tertiary tw-leading-[26px] tw-mt-0'
                >
                  {quickViewProduct?.name}
                </Title>
              </div>
              <div className='tw-mb-3'>
                <Text className='tw-font-semibold tw-text-primary tw-text-base'>
                  {calcDiscountPrice(
                    quickViewProduct?.price,
                    quickViewProduct?.discount_amount,
                    quickViewProduct?.discount_percent
                  )}
                </Text>
                <Text className='tw-text-secondary tw-text-sm tw-line-through tw-ml-[5px]'>
                  {quickViewProduct?.price}
                </Text>
                <Text className='tw-ml-2 tw-text-secondary tw-font-semibold'>VNĐ</Text>
              </div>
              <div className='tw-mb-[19px]'>
                <Paragraph className='tw-leading-6 tw-text-[15px] tw-text-secondary tw-m-0'>
                  {quickViewProduct?.description}
                </Paragraph>
              </div>
              <div>
                <Form
                  layout='vertical'
                  form={form}
                  initialValues={{
                    quantity: 1
                  }}
                >
                  <Form.Item
                    label={
                      <Title
                        level={2}
                        className='tw-text-base tw-text-tertiary tw-font-semibold tw-uppercase tw-mb-[7px] tw-leading-5'
                      >
                        Kích Thước
                      </Title>
                    }
                    name='color'
                    required
                    rules={[
                      {
                        required: true,
                        message: 'Chọn ít nhất một màu'
                      }
                    ]}
                  >
                    <Select
                      size='large'
                      placeholder='Chọn màu sắc'
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
                    name='size'
                    label={
                      <Title
                        level={2}
                        className='tw-text-base tw-text-tertiary tw-font-semibold tw-uppercase tw-mb-[7px] tw-leading-5'
                      >
                        Kích Thước
                      </Title>
                    }
                    required
                    rules={[
                      {
                        required: true,
                        message: 'Chọn ít nhất một kích thước'
                      }
                    ]}
                  >
                    <Select options={sizesSelect} size='large' placeholder='Chọn ít nhất một kích thước' />
                  </Form.Item>
                  <div className='tw-flex tw-items-end tw-gap-2.5'>
                    <Form.Item
                      name='quantity'
                      label={
                        <Title
                          level={2}
                          className='tw-text-base tw-text-tertiary tw-font-semibold tw-uppercase tw-mb-[7px] tw-leading-5'
                        >
                          Số Lượng
                        </Title>
                      }
                    >
                      <InputNumber size='large' min={1} />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        htmlType='submit'
                        type='primary'
                        className='tw-bg-black tw-font-bold tw-uppercase hover:tw-text-white hover:tw-bg-primary'
                        size='large'
                        icon={<Icon name='ShoppingCartOutlined' className='tw-text-xl tw-mr-2' />}
                      >
                        Thêm vào giỏ hàng
                      </Button>
                    </Form.Item>
                  </div>
                </Form>
                <div></div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Modal>
  )
}

export default QuickViewProduct
