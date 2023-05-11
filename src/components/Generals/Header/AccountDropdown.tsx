import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faSignOut } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { Avatar, MenuProps, Typography, Dropdown, Space } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { Icon } from '..'

const { Text } = Typography

const items: MenuProps['items'] = [
  {
    label: <Link to={'/thong-tin-ca-nhan'}>Thông tin tài khoản</Link>,
    key: '0'
  },
  {
    label: <Link to={'/cai-dat'}>Cài đặt</Link>,
    key: '1'
  },
  {
    label: <Link to={'/lich-su-mua-hang'}>Lịch sử đặt hàng</Link>,
    key: '2'
  },
  {
    type: 'divider'
  },
  {
    label: 'Đăng xuất',
    icon: <FontAwesomeIcon icon={faSignOut} />,
    danger: true,
    key: 'signout'
  }
]
const AccountDropdown = () => {
  const handleClick = (info: any) => {
    if (info.key === 'signout') {
      return
    }
    return
  }

  return (
    <Dropdown menu={{ items, onClick: (info) => handleClick(info) }} trigger={['click']}>
      <a href='#' role='button' onClick={(e) => e.preventDefault()}>
        <Space size={5} className='tw-text-tertiary tw-items-center hover:tw-text-primary tw-group group-[]'>
          <Avatar size='small' src={null} alt='user image' shape='circle' icon={<Icon name='UserOutlined' />} />
          {'Admin'}
          <FontAwesomeIcon
            icon={faChevronDown}
            className='tw-text-[#6c6c6c] tw-text-[10px] group-hover:tw-text-primary hover:tw-text-primary'
          />
        </Space>
      </a>
    </Dropdown>
  )
}

export default AccountDropdown
