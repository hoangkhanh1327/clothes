import { ReactNode, useEffect, useState, useMemo, useRef } from 'react';
import { NextPageWithLayout } from '../_app';
import { HomeLayout } from '@/layouts';
import {
    Breadcrumb,
    Col,
    Row,
    Table,
    Space,
    Image,
    Typography,
    InputNumber,
    Input,
    Divider,
    message,
    Button,
    InputRef,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { CartItem } from '@/interfaces';
import { useAppDispatch, useAppSelector } from '@/redux/reduxHooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { format3P } from '@/modules/common/utils';
import { CartActions } from '@/redux/actions';
import { useRouter } from 'next/router';

const { Title, Text } = Typography;
const Tax = 10;

const Cart: NextPageWithLayout = () => {
    const [items, setItems] = useState<CartItem[]>([]);
    const cart = useAppSelector((state) => state.cart);
    const [shippingFee, setShippingFee] = useState<number>(100000);
    const [discount, setDiscount] = useState<number>(0);
    const [couponCode, setCouponCode] = useState<string>('');
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        document.title = 'Giỏ hàng - Panthers Shop';
    }, []);

    useEffect(() => {
        setItems(cart.items);
    }, [cart.items]);

    const calculateTotalBeforeTax = useMemo(() => {
        let total = 0;
        if (items.length) {
            items.map(
                (product: CartItem) =>
                    (total += product.price * product.quantity)
            );
        }
        return total;
    }, [items]);

    const calculateTotalAfterTax = useMemo(() => {
        let total = 0;
        if (items.length) {
            items.map(
                (product: CartItem) =>
                    (total += product.price * product.quantity)
            );
        }
        if (Tax <= 0) {
            return total;
        } else {
            let vatValue = (total * Tax) / 100;
            return total + vatValue;
        }
    }, [items]);

    const handleUpdateItemQuantity = (
        keyInCart: string,
        value: number | null
    ) => {
        setItems((items) => {
            const updatedItems = items.map((item) => {
                if (item.keyInCart === keyInCart) {
                    return {
                        ...item,
                        quantity: value || 0,
                    };
                }
                return item;
            });
            return updatedItems;
        });
    };

    const handleRemoveItem = (keyInCart: string) => {
        // @ts-ignore: Unreachable code error
        dispatch(CartActions.removeItemFromCart(keyInCart));
    };

    const handleUpdateCartItem = () => {
        // @ts-ignore: Unreachable code error
        dispatch(CartActions.updateCartAll(items));
    };

    const handleEnterCode = async () => {
        if (couponCode) {
            if (couponCode === 'KHANHDEPTRAI'.toLocaleLowerCase()) {
                try {
                    messageApi.success('Áp dụng thành công !');
                    setDiscount(50000);
                } catch (error) {}
            } else {
                messageApi.error('Mã không hợp lệ !');
            }
            setCouponCode('');
        }
    };

    const columns: ColumnsType<CartItem> = [
        {
            title: (
                <Text className='tw-uppercase tw-text-secondary tw-text-sm tw-text-center tw-font-semibold'>
                    Hình ảnh
                </Text>
            ),
            dataIndex: 'image',
            align: 'center',
            key: 'image',
            render: (image) => (
                <Image
                    src={image}
                    alt={``}
                    placeholder={true}
                    preview={false}
                    width={83}
                    height={98}
                />
            ),
        },
        {
            title: (
                <Text className='tw-uppercase tw-text-secondary tw-text-sm tw-text-center tw-font-semibold'>
                    Sản phẩm
                </Text>
            ),
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: (
                <Text className='tw-uppercase tw-text-secondary tw-text-sm tw-text-center tw-font-semibold'>
                    đơn giá
                </Text>
            ),
            dataIndex: 'price',
            key: 'price',
            render(value, record, index) {
                return (
                    <Text className='tw-text-secondary tw-min-w-[160px] tw-text-sm tw-font-semibold'>
                        {format3P(record.price)} VNĐ
                    </Text>
                );
            },
        },
        {
            title: (
                <Text className='tw-uppercase tw-text-secondary tw-text-sm tw-text-center tw-font-semibold'>
                    Thông tin
                </Text>
            ),
            key: 'info',
            dataIndex: 'info',

            render(value, record, index) {
                return (
                    <Space direction='vertical'>
                        <Text className='tw-text-secondary'>
                            Kích thước:{' '}
                            <span className='tw-uppercase tw-font-semibold'>
                                {record.size}
                            </span>
                        </Text>
                        <Text className='tw-text-secondary'>
                            Màu sắc:{' '}
                            <span className='tw-uppercase tw-font-semibold'>
                                {record.color}
                            </span>
                        </Text>
                    </Space>
                );
            },
        },
        {
            title: (
                <Text className='tw-uppercase tw-text-secondary tw-text-sm tw-text-center tw-font-semibold'>
                    Số lượng
                </Text>
            ),
            key: 'quantity',
            render: (_, record) => (
                <Space size='middle'>
                    <InputNumber
                        value={record.quantity}
                        onChange={(value) =>
                            handleUpdateItemQuantity(record.keyInCart, value)
                        }
                    />
                </Space>
            ),
        },
        {
            title: (
                <Text className='tw-uppercase tw-text-secondary tw-text-sm tw-text-center tw-font-semibold'>
                    thành tiền
                </Text>
            ),
            dataIndex: 'total',
            key: 'total',
            render(value, record, index) {
                return (
                    <Text className='tw-text-primary tw-min-w-[160px] tw-text-lg tw-font-semibold'>
                        {format3P(record.quantity * record.price)} VNĐ
                    </Text>
                );
            },
        },
        {
            title: (
                <Text className='tw-uppercase tw-text-secondary tw-text-sm tw-text-center tw-font-semibold'>
                    #
                </Text>
            ),
            key: 'action',
            align: 'center',
            render: (_, record) => (
                <Space size='middle'>
                    <FontAwesomeIcon
                        className='tw-cursor-pointer tw-text-red-600'
                        role='button'
                        icon={faTrashCan}
                        onClick={() => handleRemoveItem(record.keyInCart)}
                    />
                </Space>
            ),
        },
    ];

    return (
        <div className='tw-container'>
            {contextHolder}
            <Breadcrumb
                className='tw-text-sm tw-py-11'
                items={[
                    {
                        title: 'Trang chủ',
                        href: '/',
                        className: 'hover:tw-text-primaryOrange',
                    },
                    { title: 'Giỏ hàng' },
                ]}
            />
            <Row gutter={[24, 24]}>
                <Col span={24}>
                    <Table
                        className='tw-border-2 first:!tw-fixedtw-border-b-4'
                        columns={columns}
                        dataSource={items}
                        pagination={false}
                        footer={() => {
                            return (
                                <div>
                                    <Button
                                        onClick={() => handleUpdateCartItem()}
                                        className='tw-ml-auto tw-block tw-bg-black tw-text-white hover:!tw-bg-primary hover:!tw-text-white tw-font-semibold tw-text-xs tw-capitalize'
                                        size='large'
                                    >
                                        Tính lại giỏ hàng
                                    </Button>
                                </div>
                            );
                        }}
                    />
                </Col>
                <Divider />

                <Col span={11} className='tw-px-4'>
                    <Row gutter={[0, 24]} className='tw-bg-[#fafafa]'>
                        <Col span={24}>
                            <div className='tw-py-3 tw-bg-[#242424] tw-px-4'>
                                <Title
                                    level={3}
                                    className='tw-capitalize !tw-text-white !tw-text-base'
                                >
                                    mã giảm giá (COUPON)
                                </Title>
                            </div>
                        </Col>
                        <Col span={24} className='tw-px-4'>
                            <Text>Nhập mã giảm giá nếu có.</Text>
                        </Col>
                        <Col span={24} className='tw-px-4 tw-mb-6'>
                            <div className='tw-w-1/2 tw-inline-block'>
                                <Input
                                    placeholder='Mã giảm giá ...'
                                    size='large'
                                    value={couponCode}
                                    onChange={(e) =>
                                        setCouponCode(e.target.value)
                                    }
                                />
                            </div>
                            <Button
                                size='large'
                                onClick={handleEnterCode}
                                className='tw-ml-6 tw-inline-block tw-font-semibold tw-bg-black !tw-text-white hover:!tw-bg-primary'
                            >
                                Áp dụng mã
                            </Button>
                        </Col>
                    </Row>
                </Col>

                <Col span={12} offset={1} className='tw-px-4'>
                    <Row gutter={[0, 24]} className='tw-bg-[#fafafa]'>
                        <Col span={24} className='tw-py-3 tw-bg-black tw-px-4'>
                            <Title
                                level={3}
                                className='tw-capitalize !tw-text-white !tw-text-base'
                            >
                                thành tiền
                            </Title>
                        </Col>
                        <Col span={12} className='tw-px-4'>
                            <Text className='tw-text-sm tw-capitalize tw-font-semibold tw-text-[#242424]'>
                                tổng tiền
                            </Text>
                        </Col>
                        <Col span={12} className='tw-text-right tw-px-4'>
                            <Text className='tw-text-lg tw-font-semibold'>
                                {format3P(calculateTotalBeforeTax)} VNĐ
                            </Text>
                        </Col>
                        <Col span={12} className='tw-px-4'>
                            <Text className='tw-text-sm tw-capitalize tw-font-semibold tw-text-[#242424]'>
                                giảm giá
                            </Text>
                        </Col>
                        <Col span={12} className='tw-text-right tw-px-4'>
                            <Text className='tw-text-lg tw-font-semibold tw-text-red-500'>
                                {' '}
                                -{format3P(discount)} VNĐ
                            </Text>
                        </Col>
                        <Col span={12} className='tw-px-4'>
                            <Text className='tw-text-sm tw-capitalize tw-font-semibold tw-text-[#242424]'>
                                thành tiền
                            </Text>
                        </Col>
                        <Col
                            span={12}
                            className='tw-text-right tw-px-4 tw-mb-6'
                        >
                            <Text className='tw-text-lg tw-font-semibold tw-text-primary'>
                                {format3P(
                                    calculateTotalAfterTax +
                                        shippingFee -
                                        discount
                                )}{' '}
                                VNĐ
                            </Text>
                        </Col>
                        <Col
                            span={12}
                            offset={12}
                            className='tw-text-right tw-px-4 tw-mb-6'
                        >
                            <Button
                                onClick={() => router.push('/thanh-toan')}
                                className='tw-ml-6 tw-inline-block tw-font-semibold tw-bg-black !tw-text-white hover:!tw-bg-primary'
                                size='large'
                            >
                                Thanh toán ngay
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Divider />
        </div>
    );
};

Cart.getLayout = function getLayout(page: ReactNode) {
    return <HomeLayout>{page}</HomeLayout>;
};
export default Cart;