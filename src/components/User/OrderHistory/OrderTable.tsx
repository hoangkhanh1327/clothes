import { Table } from 'antd'
import { withTableSize } from '~/hocs'

const OrderTable = (props: any) => {
  const { parrentSize } = props
  return <Table scroll={{ y: parrentSize?.height }} />
}

export default withTableSize(OrderTable)
