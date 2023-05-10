import React, { useEffect, useState } from 'react';
import { Dropdown, MenuProps, Modal, Space, Tooltip } from 'antd';
import { Layout, Menu, theme } from 'antd';
import Icon from './Icon';
import { ProtectedRoutes } from '../../routes';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { generateSlug } from '../../utils/functionals';
import {
    deleteAccountTypeAsync,
    toggleTypeFormVisible,
} from '../../redux/reducers/accountSlice';
import { AccountTypeType } from '../../interfaces';

const { Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    id: number | string,
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group'
): MenuItem {
    return {
        id,
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const menu: MenuItem[] = [];
const subMenuKeys: string[] = [];
const { confirm } = Modal;

Object.values(ProtectedRoutes).forEach((route: any) => {
    let parentId = route.parentId;
    let isParentExist: any = menu.find((route: any) => route.id === parentId);
    let icon = route?.icon ? <Icon name={route?.icon} /> : null;
    if (isParentExist) {
        isParentExist.children = isParentExist.children
            ? [
                  ...isParentExist.children,
                  getItem(route.id, route.name, route.path, icon),
              ]
            : [getItem(route.id, route.name, route.path, icon)];
    } else {
        subMenuKeys.push(route.path);
        menu.push(getItem(route.id, route.name, route.path, icon));
    }

    return menu;
});

const items: MenuProps['items'] = [
    {
        label: 'Chỉnh sửa',
        key: 'updateAccountType',
    },
    {
        label: 'Xoá',
        key: 'deleteAccountType',
        danger: true,
    },
];

const HomeSider: React.FC<{}> = ({}) => {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const { accountTypes } = useAppSelector((state) => state.account);
    const { pathname } = useLocation();
    const [openKeys, setOpenKeys] = useState([subMenuKeys[0]]);
    const [collapsedWidth, setCollapseWidth] = useState<number>(80);
    const [siderMenu, setSiderMenu] = useState<any[]>(menu);
    const dispatch = useAppDispatch();

    const handleClickAccountTypeDropdown = (
        props: any,
        accountType: AccountTypeType
    ) => {
        let key = props.key || '';
        switch (key) {
            case 'updateAccountType':
                return dispatch(
                    toggleTypeFormVisible({
                        visible: true,
                        formData: accountType,
                    })
                );
            case 'deleteAccountType':
                confirm({
                    title: 'Bạn chắc chắn muốn xoá tài khoản này ?',
                    icon: <Icon name='ExclamationCircleFilled' />,
                    okText: 'Xác nhận',
                    okType: 'danger',
                    cancelText: 'Huỷ',
                    onOk() {
                        dispatch(
                            deleteAccountTypeAsync(accountType.id as number)
                        );
                    },
                    onCancel() {},
                });
                return;
            default:
                return;
        }
    };

    useEffect(() => {
        if (accountTypes.length) {
            const accountMenu = accountTypes.map((accountType, key) => {
                return getItem(
                    `account-type-${accountType.id}` as string,
                    <div className='tw-relative tw-group group-[] '>
                        {accountType.name}
                        <Dropdown
                            menu={{
                                items,
                                onClick: (props) =>
                                    handleClickAccountTypeDropdown(
                                        props,
                                        accountType
                                    ),
                            }}
                            trigger={['click']}
                            className='tw-hidden tw-text-base group-hover:tw-block tw-absolute tw-right-2 tw-top-1/2 -tw-translate-y-1/2'
                        >
                            <a
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                }}
                            >
                                <Space>
                                    <Tooltip
                                        title='Chính sửa'
                                        placement='right'
                                    >
                                        <Icon name='DashOutlined' rotate={90} />
                                    </Tooltip>
                                </Space>
                            </a>
                        </Dropdown>
                    </div>,
                    `/tai-khoan/${generateSlug(accountType.name)}`,
                    []
                );
            });
            accountMenu.unshift(
                getItem(`account-type-add-new`, 'Tất cả', '/tai-khoan/')
            );
            accountMenu.push(
                getItem(
                    `account-type-add-new`,
                    'Thêm Loại Tài Khoản',
                    'addNewAccountType'
                )
            );
            setSiderMenu([...siderMenu, (siderMenu[0].children = accountMenu)]);
        }
    }, [accountTypes]);

    const onClick: MenuProps['onClick'] = (e) => {
        if (e.key === 'addNewAccountType') {
            dispatch(toggleTypeFormVisible({ visible: true }));
        } else {
            navigate(e.key);
        }
    };

    const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
        const lastestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (subMenuKeys.indexOf(lastestOpenKey!) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(lastestOpenKey ? [lastestOpenKey] : []);
        }
    };

    return (
        <Sider
            width={230}
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            breakpoint='md'
            collapsedWidth={collapsedWidth}
            onBreakpoint={(broken) => {
                if (broken) {
                    setCollapseWidth(0);
                } else {
                    setCollapseWidth(80);
                }
            }}
        >
            <div
                style={{
                    height: 32,
                    margin: 16,
                    background: 'rgba(255, 255, 255, 0.2)',
                }}
            />
            <Menu
                theme='dark'
                defaultSelectedKeys={[pathname]}
                openKeys={openKeys}
                mode='inline'
                items={siderMenu}
                onOpenChange={onOpenChange}
                onClick={onClick}
            />
        </Sider>
    );
};

export default HomeSider;
