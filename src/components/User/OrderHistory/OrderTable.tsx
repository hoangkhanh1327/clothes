import { Button, Table } from 'antd'
import { withTableSize } from '~/hocs'
import type { ColumnsType } from 'antd/es/table'

const OrderTable = (props: any) => {
  const { parrentSize } = props

  const columns: ColumnsType<any> = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Tình trạng',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: '',
      dataIndex: 'address',
      key: 'address',
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
    />
  )
}

export default withTableSize(OrderTable)
