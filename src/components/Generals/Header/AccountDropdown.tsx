import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Avatar, MenuProps, Typography } from 'antd';
import { Dropdown, Image, Space } from 'antd';
import { useAppDispatch, useAppSelector } from '@/redux/reduxHooks';
import { useRouter } from 'next/router';
import { AuthActions } from '@/redux/actions';
import { UserType } from '@/interfaces';
import { UserOutlined } from '@ant-design/icons';

const { Text } = Typography;

const items: MenuProps['items'] = [
    {
        label: <Link href={'/thong-tin-ca-nhan'}>Thông tin tài khoản</Link>,
        key: '0',
    },
    {
        label: <Link href={'/cai-dat'}>Cài đặt</Link>,
        key: '1',
    },
    {
        label: <Link href={'/lich-su-mua-hang'}>Lịch sử đặt hàng</Link>,
        key: '2',
    },
    {
        type: 'divider',
    },
    {
        label: 'Đăng xuất',
        icon: <FontAwesomeIcon icon={faSignOut} />,
        danger: true,
        key: 'signout',
    },
];
const AccountDropdown = () => {
    const { user }: { user: UserType } = useAppSelector((state) => state.auth);
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleClick = (info: any) => {
        if (info.key === 'signout') {
            // @ts-ignore: Unreachable code error
            dispatch(AuthActions.signout());
        }
    };

    return (
        <Space size={12} align='center' className='tw-h-10'>
            <Avatar
                src={user.photo}
                alt='user image'
                shape='circle'
                icon={<UserOutlined />}
            />

            <Dropdown
                menu={{ items, onClick: (info) => handleClick(info) }}
                trigger={['click']}
            >
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        <Text className='tw-text-white hover:tw-text-primary'>
                            {user.fullname}
                        </Text>
                        <FontAwesomeIcon
                            icon={faChevronDown}
                            className='tw-text-white hover:tw-text-primary'
                        />
                    </Space>
                </a>
            </Dropdown>
        </Space>
    );
};

export default AccountDropdown;
