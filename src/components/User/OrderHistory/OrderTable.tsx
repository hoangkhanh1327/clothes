import { Badge, Button, Table, Tag } from 'antd'
import { withTableSize } from '~/hocs'
import type { ColumnsType } from 'antd/es/table'
import { useEffect, useState } from 'react'
import { format3P } from '~/utils'
import moment from 'moment'
import { Icon } from '~/components/Generals'

const temp = [
  {
    key: 'DH3_16',
    id: 'DH3_16',
    date: new Date(),
    status: 'waiting',
    total: 250000
  },
  {
    key: 'DH3_17',
    id: 'DH3_17',
    date: new Date(),
    status: 'completed',
    total: 450000
  },
  {
    key: 'DH3_18',
    id: 'DH3_18',
    date: new Date(),
    status: 'cancelled',
    total: 150000
  },
  {
    key: 'DH3_19',
    id: 'DH3_19',
    date: new Date(),
    status: 'completed',
    total: 250000
  }
]

const OrderTable = (props: any) => {
  const { parrentSize, dataSource } = props
  const [data, setData] = useState(temp)

  useEffect(() => {
    if (dataSource && dataSource.length) {
      setData(
        dataSource.map((item: any) => ({
          id: item?.id,
          status: item?.status,
          total: item?.total
        }))
      )
    }
  }, [dataSource])

  const columns: ColumnsType<any> = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Ngày đặt hàng',
      dataIndex: 'date',
      key: 'date',
      render(value, record, index) {
        return moment(value).format('DD/MM/YYYY')
      }
    },
    {
      title: 'Tình trạng',
      dataIndex: 'status',
      key: 'status',
      render(value, record, index) {
        if (value === 'waiting') {
          return (
            <Tag color='warning' className='tw-text-sm' icon={<Icon name='SyncOutlined' spin />}>
              Đang chờ
            </Tag>
          )
        }
        if (value === 'cancelled') {
          return (
            <Tag color='error' className='tw-text-sm' icon={<Icon name='ExclamationCircleOutlined' spin />}>
              Đã huỷ
            </Tag>
          )
        }
        return (
          <Tag color='success' className='tw-text-sm' icon={<Icon name='CheckCircleOutlined' />}>
            Đã thanh toán
          </Tag>
        )
      }
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'total',
      key: 'total',
      render(value: any) {
        return format3P(value) + 'đ'
      }
    },
    {
      title: '',
      key: 'detail',
      width: 120,
      render(value, record, index) {
        return (
          <Button className='tw-bg-primary tw-text-white' onClick={() => props.showDetail(record.id)}>
            Chi tiết
          </Button>
        )
      }
    }
  ]
  return (
    <Table
      columns={columns}
      className={`tw-min-h-full tw-h-[${parrentSize?.height}px]`}
      scroll={{ y: parrentSize?.height }}
      dataSource={data}
      pagination={{
        total: dataSource?.length || 0
      }}
    />
  )
}

export default withTableSize(OrderTable)
