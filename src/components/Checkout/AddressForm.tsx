import { Checkbox, Form, Input, Modal, Select } from 'antd'
import { useState, useEffect } from 'react'

interface FieldData {
  name: string | number | (string | number)[]
  value?: any
  touched?: boolean
  validating?: boolean
  errors?: string[]
}

const AddressForm = ({ open, onClose, address }: { open: boolean; onClose: Function; address?: any }) => {
  const [form] = Form.useForm()
  const [fields, setFields] = useState<FieldData[]>([{ name: ['province'], value: '' }])
  // const [provinces, setProvinces] = useState([])

  useEffect(() => {
    // getProvinces()
  }, [])

  // const getProvinces = async () => {
  //   try {
  //     const res = await CommonServives.getProvinces()
  //     console.log('res', res)
  //   } catch (error) {}
  // }

  return (
    <Modal
      open={open}
      title={`${!address ? 'Thêm mới ' : 'Chỉnh sửa '} địa chỉ`}
      bodyStyle={{
        borderTop: '1px solid black'
      }}
      onCancel={() => onClose()}
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
        >
          <Form.Item
            name='province'
            label='Chọn Tỉnh / Thành phố'
            required
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn tỉnh / thành phố'
              }
            ]}
          >
            <Select placeholder='Chọn quận / huyện' />
          </Form.Item>
          <Form.Item
            name='district'
            label='Chọn Huyện / Quận'
            required
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn huyện / quận'
              }
            ]}
          >
            <Select disabled={!form.getFieldValue('province')} placeholder='Chọn quận / huyện ...' />
          </Form.Item>
          <Form.Item
            name='ward'
            label='Chọn Xã / Phường'
            required
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn xã / phường'
              }
            ]}
          >
            <Select disabled={!form.getFieldValue('province')} placeholder='Chọn xã / phường ...' />
          </Form.Item>
          <Form.Item
            name='detail'
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
