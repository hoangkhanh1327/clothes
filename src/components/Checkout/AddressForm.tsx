import { Checkbox, Form, Input, Modal, Select } from 'antd'
import { useState, useEffect } from 'react'
import { CommonServives } from '~/services'

interface FieldData {
  name: string | number | (string | number)[]
  value?: any
  touched?: boolean
  validating?: boolean
  errors?: string[]
}

const AddressForm = ({
  open,
  onClose,
  onSubmit,
  address
}: {
  open: boolean
  onClose: Function
  address?: any
  onSubmit: Function
}) => {
  const [form] = Form.useForm()
  const [fields, setFields] = useState<FieldData[]>([{ name: ['province'], value: '' }])
  const [loading, setLoading] = useState(false)
  const [provinces, setProvinces] = useState<any[]>([])
  const [districts, setDistricts] = useState<any[]>([])
  const [wards, setWards] = useState<any[]>([])

  const provinceId = Form.useWatch('provinceId', form)
  const districtId = Form.useWatch('districtId', form)

  useEffect(() => {
    getProvinces()
  }, [])

  useEffect(() => {
    if (provinceId) {
      getDistricts(provinceId)
    }
  }, [provinceId])

  useEffect(() => {
    getWards(districtId)
  }, [districtId])

  const getProvinces = async () => {
    try {
      setLoading(true)
      const res = await CommonServives.getProvinces()
      setProvinces(res.data.data)
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  const getDistricts = async (provinceId: any) => {
    try {
      setLoading(true)
      const res = await CommonServives.getDistrict(provinceId)
      setDistricts(res.data.data)
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  const getWards = async (districtId: any) => {
    try {
      setLoading(true)
      const res = await CommonServives.getWard(districtId)
      setWards(res.data.data)
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitForm = (values: any) => {
    const transformedParams = {
      name: values?.name || '',
      address: values?.address || '',
      district_id: values?.districtId,
      province_id: values?.provinceId,
      ward_code: values?.wardCode
    }
    onSubmit(transformedParams)
  }

  console.log('???', loading)

  return (
    <Modal
      open={open}
      title={`${!address ? 'Thêm mới ' : 'Chỉnh sửa '} địa chỉ`}
      bodyStyle={{
        borderTop: '1px solid black'
      }}
      onCancel={() => {
        form.resetFields()
        onClose()
      }}
      onOk={() => form.submit()}
    >
      <div className='tw-py-3'>
        <Form
          layout='vertical'
          form={form}
          fields={fields}
          onFieldsChange={(_, allFields) => {
            setFields(allFields)
          }}
          onFinish={handleSubmitForm}
        >
          <Form.Item
            name='name'
            label='Tên ghi nhớ'
            required
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tên ghi nhớ cho địa chỉ này'
              }
            ]}
          >
            <Input placeholder='Đường abc ...' />
          </Form.Item>
          <Form.Item
            name='provinceId'
            label='Chọn Tỉnh / Thành phố'
            required
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn tỉnh / thành phố'
              }
            ]}
          >
            <Select
              loading={loading}
              placeholder='Chọn tỉnh / thành phố'
              options={provinces?.map((province: any) => ({
                value: province?.ProvinceID,
                label: province?.ProvinceName
              }))}
              showSearch
              filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
            />
          </Form.Item>
          <Form.Item
            name='districtId'
            label='Chọn Huyện / Quận'
            required
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn huyện / quận'
              }
            ]}
          >
            <Select
              loading={loading}
              disabled={!form.getFieldValue('provinceId')}
              placeholder='Chọn quận / huyện ...'
              options={districts?.map((district: any) => ({
                value: district?.DistrictID,
                label: district?.DistrictName
              }))}
              showSearch
              filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
            />
          </Form.Item>
          <Form.Item
            name='wardCode'
            label='Chọn Xã / Phường'
            required
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn xã / phường'
              }
            ]}
          >
            <Select
              loading={true}
              disabled={!form.getFieldValue('districtId')}
              placeholder='Chọn xã / phường ...'
              options={wards?.map((ward: any) => ({
                value: ward?.WardCode,
                label: ward?.WardName
              }))}
              showSearch
              filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
            />
          </Form.Item>
          <Form.Item
            name='address'
            label='Địa chỉ chi tiết'
            required
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập địa chỉ chi tiết'
              }
            ]}
          >
            <Input placeholder='Đường abc ...' />
          </Form.Item>
          <Form.Item name='isDefault' label=''>
            <Checkbox>Đặt làm địa chỉ mặc định</Checkbox>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  )
}

export default AddressForm
