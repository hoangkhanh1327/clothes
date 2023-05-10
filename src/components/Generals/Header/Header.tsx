import Link from 'next/link';
import { Searchbar, Nav, Cart, AccountDropdown } from '.';
import { config } from '../../../utils';
import { Col, Image, Menu, Row, Space } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/redux/reduxHooks';

export default function Header() {
    const router = useRouter();
    const { asPath } = router;
    const [currentPage, setCurrentPage] = useState<string>('/');
    const { user } = useAppSelector((state) => state.auth);

    useEffect(() => {
        setCurrentPage(asPath.split('?')[0]);
    }, [asPath]);

    return (
        <>
            <div className='tw-h-10 tw-bg-black tw-fixed tw-inset-x-0 tw-top-0 tw-z-[999]'>
                <div className='tw-relative tw-full tw-px-3'>
                    <Row gutter={[12, 12]}>
                        <Col span={24} className='tw-text-right'>
                            {user ? (
                                <AccountDropdown />
                            ) : (
                                <Space size={12}>
                                    <Link
                                        className='tw-text-sm tw-leading-10 hover:tw-text-primary'
                                        href={'/dang-nhap'}
                                    >
                                        Đăng nhập
                                    </Link>
                                    <Link
                                        className='tw-text-sm tw-leading-10 hover:tw-text-primary'
                                        href={'/dang-ky'}
                                    >
                                        Đăng ký
                                    </Link>
                                </Space>
                            )}
                        </Col>
                    </Row>
                </div>
            </div>
            <div className='tw-fixed tw-inset-x-0 tw-top-10 tw-z-50 tw-bg-white tw-shadow-lg tw-px-8 tw-pt-10'>
                <div className='tw-relative tw-full tw-px-3'>
                    <div className='tw-pb-10'>
                        <Row gutter={[12, 12]}>
                            <Col span={8}></Col>
                            <Col span={8}></Col>
                            <Col span={8} className='tw-text-right'>
                                <Space>
                                    <Searchbar />
                                    <Cart />
                                </Space>
                            </Col>
                        </Row>
                    </div>
                    <div className='tw-flex tw-items-center tw-justify-center tw-max-w-[1190px] tw-absolute tw-left-[50%] tw-top-[calc(50%-25px)] -tw-translate-x-1/2 -tw-translate-y-1/2  !z-[999]'>
                        <Menu
                            mode='horizontal'
                            className='tw-flex-1 !tw-border-none'
                            selectedKeys={[currentPage]}
                        >
                            <Menu.Item
                                key={'/'}
                                className={`!tw-min-w-[56px] hover:!tw-text-primary after:tw-border-none !tw-text-base !tw-leading-6 tw-font-bold hover:after:!tw-border-b-primary after:!-tw-bottom-1.5 after:!tw-border-b-[3px] after:!tw-w-1/2 after:tw-transition-all ${
                                    currentPage === '/' &&
                                    '!tw-text-primary after:!tw-border-b-primary'
                                }`}
                                onClick={() => router.push('/')}
                            >
                                Trang chủ
                            </Menu.Item>
                            <Menu.Item
                                key={'/san-pham'}
                                className={`!tw-min-w-[56px] hover:!tw-text-primary after:tw-border-none !tw-text-base !tw-leading-6 tw-font-bold  hover:after:!tw-border-b-primary after:!-tw-bottom-1.5 after:!tw-border-b-[3px] after:!tw-w-1/2 after:tw-transition-all ${
                                    currentPage === '/san-pham' &&
                                    '!tw-text-primary after:!tw-border-b-primary'
                                }`}
                                onClick={() => router.push('/san-pham')}
                            >
                                Sản phẩm
                            </Menu.Item>
                            <Menu.Item
                                key={'#'}
                                className={`!tw-min-w-[56px] hover:!tw-text-primary after:tw-border-none !tw-text-base !tw-leading-6 tw-font-bold hover:after:!tw-border-b-primary after:!-tw-bottom-1.5 after:!tw-border-b-[3px] after:!tw-w-1/2 after:tw-transition-all`}
                                onClick={() => {}}
                            ></Menu.Item>
                        </Menu>
                        <Link
                            href={'/'}
                            className=' tw-px-28 tw-text-center tw-h-full tw-flex tw-items-center'
                        >
                            <Image
                                src={`${config.publicUrl}/images/logo.png`}
                                alt='logo'
                                title='logo'
                                preview={false}
                            />
                        </Link>
                        <Menu
                            mode='horizontal'
                            className='tw-flex-1 !tw-border-none'
                            selectedKeys={[currentPage]}
                        >
                            <Menu.Item
                                key={'/bai-viet'}
                                className={`!tw-min-w-[56px] hover:!tw-text-primary after:tw-border-none !tw-text-base !tw-leading-6 tw-font-bold hover:after:!tw-border-b-primary after:!-tw-bottom-1.5 after:!tw-border-b-[3px] after:!tw-w-1/2 after:tw-transition-all ${
                                    currentPage === '/bai-viet' &&
                                    '!tw-text-primary after:!tw-border-b-primary'
                                }`}
                                onClick={() => router.push('/bai-viet')}
                            >
                                Tin tức
                            </Menu.Item>
                            <Menu.Item
                                key={'/ve-chung-toi'}
                                className={`!tw-min-w-[56px] hover:!tw-text-primary after:tw-border-none !tw-text-base !tw-leading-6 tw-font-bold hover:after:!tw-border-b-primary after:!-tw-bottom-1.5 after:!tw-border-b-[3px] after:!tw-w-1/2 after:tw-transition-all ${
                                    currentPage === '/ve-chung-toi' &&
                                    '!tw-text-primary after:!tw-border-b-primary'
                                }`}
                                onClick={() => router.push('/ve-chung-toi')}
                            >
                                Về chúng tôi
                            </Menu.Item>
                            <Menu.Item
                                key={'/lien-he'}
                                className={`!tw-min-w-[56px] hover:!tw-text-primary after:tw-border-none !tw-text-base !tw-leading-6 tw-font-bold hover:after:!tw-border-b-primary after:!-tw-bottom-1.5 after:!tw-border-b-[3px] after:!tw-w-1/2 after:tw-transition-all ${
                                    currentPage === '/lien-he' &&
                                    '!tw-text-primary after:!tw-border-b-primary'
                                }`}
                                onClick={() => router.push('/lien-he')}
                            >
                                Liên hệ
                            </Menu.Item>
                        </Menu>
                    </div>
                </div>
            </div>
        </>
    );
}
