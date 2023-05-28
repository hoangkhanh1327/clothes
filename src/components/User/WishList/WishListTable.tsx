import { Button, Table } from 'antd'
import { withTableSize } from '~/hocs'
import type { ColumnsType } from 'antd/es/table'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { removeItemFromWishlistAsync, userState } from '~/redux/reducers/userSlice'

const WishListTable = (props: any) => {
  const { parrentSize } = props
  const { wishlist } = useAppSelector(userState)
  const dispatch = useAppDispatch()

  const columns: ColumnsType<any> = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: '#',
      dataIndex: 'address',
      key: 'address',
      width: 60,
      render(value, record, index) {
        return (
          <Button
            className='tw-bg-primary tw-text-white'
            onClick={() => {
              dispatch(removeItemFromWishlistAsync([record.id]))
            }}
          >
            Xoá
          </Button>
        )
      }
    }
  ]
  return (
    <Table
      columns={columns}
      dataSource={wishlist}
      className={`tw-min-h-full tw-h-[${parrentSize?.height}px]`}
      scroll={{ y: parrentSize?.height }}
    />
  )
}

export default withTableSize(WishListTable)
