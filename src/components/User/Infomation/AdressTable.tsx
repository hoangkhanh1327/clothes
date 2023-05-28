import { Table } from 'antd'
import { withTableSize } from '~/hocs'
import type { ColumnsType } from 'antd/es/table'

const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street'
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street'
  },

  {
    key: '3',
    name: 'John',
    age: 42,
    address: '10 Downing Street'
  },
  {
    key: '4',
    name: 'John',
    age: 42,
    address: '10 Downing Street'
  }
]
const columns: ColumnsType<any> = [
  {
    title: 'STT',
    dataIndex: 'name',
    key: 'name',
    width: 60,
    align: 'center',
    render(value, record, index) {
      return <span>{index + 1}</span>
    }
  },
  {
    title: 'Địa chỉ',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '#',
    dataIndex: 'age',
    key: 'age',
    width: 60
  }
]
const AddressTable = (props: any) => {
  const { parrentSize } = props

  return <Table dataSource={dataSource} columns={columns} scroll={{ y: parrentSize?.height }} />
}

export default withTableSize(AddressTable)
