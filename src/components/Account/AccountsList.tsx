import React, { useEffect, useState } from 'react';
import {
    Table,
    Dropdown,
    Space,
    Avatar,
    Modal,
    Typography,
    Input,
    Tag,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';
import type { AccountType } from '../../interfaces';
import { Icon } from '../general';
import { withTableSize } from '../../hocs';
import moment from 'moment';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
    deleteAccountAsync,
    toggleFormVisible,
} from '../../redux/reducers/accountSlice';
const { Text, Paragraph } = Typography;
const { confirm } = Modal;

const items: MenuProps['items'] = [
    {
        label: 'Chỉnh sửa',
        key: 'modify',
    },
    {
        type: 'divider',
    },

    {
        label: 'Xoá tài khoản',
        key: 'delete',
        danger: true,
    },
];

const AccountList: React.FC<any> = (props) => {
    const { filters, total, status, accounts, accountTypes } = useAppSelector(
        (state) => state.account
    );
    const dispatch = useAppDispatch();

    const [searchParams, setSearchParams] = useSearchParams();
    const [showPasswordIds, setShowPasswordIds] = useState<number[]>([]);
    const { parrentSize } = props;

    const page = filters?.page || 1,
        pageSize = filters?.pageSize || 50,
        totalAccounts = total || 0;

    const handleMenuClick = (props: any, id: number) => {
        let key = props.key || '';
        switch (key) {
            case 'showpasword': {
                setShowPasswordIds((preState) => [...preState, id]);
                break;
            }

            case 'hidepasword': {
                setShowPasswordIds((preState) =>
                    preState.filter((showId) => showId !== id)
                );
                break;
            }

            case 'delete': {
                confirm({
                    title: 'Bạn chắc chắn muốn xoá tài khoản này ?',
                    icon: <Icon name='ExclamationCircleFilled' />,
                    okText: 'Xác nhận',
                    okType: 'danger',
                    cancelText: 'Huỷ',
                    onOk() {
                        dispatch(deleteAccountAsync(id));
                    },
                    onCancel() {},
                });
                return;
            }
            case 'modify': {
                const item = accounts.find((account) => account?.id === id);
                dispatch(
                    toggleFormVisible({
                        visible: true,
                        formData: item,
                    })
                );
                return;
            }
            default:
                return;
        }
    };

    const columns: ColumnsType<AccountType> = [
        {
            title: 'Tên tài khoản',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Mật khẩu',
            dataIndex: 'password',
            key: 'password',
            render(value, record, index) {
                return (
                    <Paragraph
                        copyable={{
                            text: value,
                            format: 'text/plain',
                        }}
                    >
                        {showPasswordIds.includes(record.id as number)
                            ? value
                            : `**********`}
                    </Paragraph>
                );
            },
        },
        {
            title: 'Loại tài khoản',
            dataIndex: 'accounttypename',
            key: 'accounttypename',
            render(value, record, index) {
                const type = accountTypes.find(
                    (type) => type.id === record.accounttypeid
                );
                return (
                    <Tag
                        color={`#${type?.color || 'cccccc'}`}
                        className={`tw-text-red-[#${
                            type?.textColor || 'ffffff'
                        }] tw-text-base`}
                    >
                        {type?.name || value}
                    </Tag>
                );
            },
        },
        {
            title: 'Website',
            dataIndex: 'website',
            key: 'website',
            render(value, record, index) {
                return (
                    <Link to={value} target='_blank'>
                        {value}
                    </Link>
                );
            },
        },
        {
            title: 'Ghi chú',
            dataIndex: 'note',
            key: 'note',
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'created_at',
            width: 150,
            key: 'created_at',
            render(value, record, index) {
                return (
                    <Space direction='vertical'>
                        {moment(value).isValid()
                            ? moment(value).format('DD/MM/YYYY')
                            : ''}
                    </Space>
                );
            },
        },
        {
            title: 'Ngày cập nhật',
            dataIndex: 'created_at',
            width: 150,
            key: 'updated_at',
            render(value, record, index) {
                return (
                    <Space direction='vertical'>
                        {moment(value).isValid()
                            ? moment(value).format('DD/MM/YYYY')
                            : ''}
                    </Space>
                );
            },
        },
        {
            title: '#',
            align: 'center',
            key: 'operation',
            fixed: 'right',
            width: 50,
            render: (value, record, index) => {
                let menuItems: any[] = [...items];
                if (showPasswordIds.includes(record.id as number)) {
                    menuItems.unshift({
                        label: 'Ẩn mật khẩu',
                        key: 'hidepasword',
                    });
                } else {
                    menuItems.unshift({
                        label: 'Hiển thị mật khẩu',
                        key: 'showpasword',
                    });
                }
                return (
                    <Dropdown
                        menu={{
                            items: menuItems,
                            onClick: (props) =>
                                handleMenuClick(props, record.id as number),
                        }}
                        trigger={['click']}
                    >
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                <Icon
                                    name='SettingOutlined'
                                    className='tw-text-lg'
                                />
                            </Space>
                        </a>
                    </Dropdown>
                );
            },
        },
    ];

    return (
        <Table
            loading={status === 'loading'}
            pagination={{
                position: ['bottomRight'],
                pageSize: pageSize,
                total: totalAccounts,
                current: page,
                onChange(page, pageSize) {
                    searchParams.set('page', page.toString());
                    searchParams.set('pageSize', pageSize.toString());
                    setSearchParams(searchParams);
                },
                showTotal(total, range) {
                    return (
                        <Space>
                            <Text className='tw-text-base tw-font-semibold'>
                                Tổng cộng: {total} tài khoản
                            </Text>
                        </Space>
                    );
                },
            }}
            columns={columns}
            className={`tw-min-h-full tw-h-[${parrentSize?.height}px]`}
            dataSource={accounts.map((account) => ({
                ...account,
                key: account.id,
            }))}
            scroll={{
                x: 1500,
                y: parrentSize?.height,
                scrollToFirstRowOnChange: true,
            }}
        />
    );
};

export default withTableSize(AccountList);
