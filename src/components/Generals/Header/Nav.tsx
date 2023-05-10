import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import MenuItem from 'antd/es/menu/MenuItem';
type MenuItem = Required<MenuProps>['items'][number];
function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group'
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}
const menus = [
    {
        key: '/',
        label: 'Trang chủ',
        path: '/',
    },
    {
        key: '/san-pham',
        label: 'Sản phẩm',
        path: '/san-pham',
    },
    {
        key: '/bai-viet',
        label: 'Tin tức',
        path: '/bai-viet',
    },
    {
        key: '/ve-chung-toi',
        label: 'Về chúng tôi',
        path: '/ve-chung-toi',
    },
    {
        key: '/lien-he',
        label: 'Liên hệ',
        path: '/lien-he',
    },
];

const Nav: React.FC<{}> = ({}) => {
    const router = useRouter();
    const { asPath } = router;
    const [currentPage, setCurrentPage] = useState<string>('/');

    useEffect(() => {
        setCurrentPage(asPath.split('?')[0]);
    }, [asPath]);

    return (
        <Menu
            selectedKeys={[asPath]}
            className='tw-flex-1 !tw-border-none'
            mode='horizontal'
        >
            {menus.map((item, index) => {
                const isActive = item.path === currentPage;
                return (
                    <Menu.Item
                        key={item.key}
                        className={`hover:!tw-text-primary after:tw-border-none !tw-text-base !tw-leading-6 tw-font-bold tw-py-8 hover:after:!tw-border-b-primary after:!tw-bottom-5 after:!tw-border-b-[3px] after:!tw-w-1/2 after:tw-transition-all ${
                            isActive &&
                            '!tw-text-primary after:!tw-border-b-primary'
                        }`}
                        onClick={() => router.push(item.path)}
                    >
                        {item.label}
                    </Menu.Item>
                );
            })}
        </Menu>
    );
};

export default Nav;
