import React from 'react';
import Link from 'next/link';
import SubcribeForm from './SubcribeForm';
const footerMenu = [
    {
        title: 'Thông tin',
        childs: [
            {
                name: 'Về chúng tôi',
                url: '/ve-chung-toi',
            },
            {
                name: 'Thông tin giao hàng',
                url: '/thong-tin-giao-hang',
            },
            {
                name: 'Chính sách bảo mật',
                url: '/chinh-sach-bao-mat',
            },
            {
                name: 'Điều khoản và điều kiện',
                url: '/dieu-khoan-va-dieu-kien',
            },
            {
                name: 'Đổi trả',
                url: '/doi-tra',
            },
        ],
    },
    {
        title: 'Thông tin thêm',
        childs: [
            {
                name: 'Thương hiệu',
                url: '',
            },
            {
                name: 'Giftcode',
                url: '',
            },
            {
                name: 'Liên kết',
                url: '',
            },
            {
                name: 'Tin tức',
                url: '/bai-veit',
            },
        ],
    },
    {
        title: 'Thông tin liên hệ',
        childs: [
            {
                name: 'Địa chỉ: 6688 Princess Road, London, Greater London BAS 23JK, UK',
                url: '',
            },
            {
                name: 'Điện thoại: (+012) 800 456 789 - 987',
                url: 'tel:+012800456789',
            },
            {
                name: 'Email: demo@example.com',
                url: '',
            },
        ],
    },
];

const Footer = () => {
    return (
        <div className='tw-pt-[53px]'>
            <div className='tw-border-b tw-border-solid tw-border-stone-300 tw-pb-24'>
                <div className='tw-container tw-px-3'>
                    <div className='tw-grid lg:tw-grid-cols-6 md:tw-grid-cols-4 tw-grid-cols-1 tw-gap-6'>
                        {footerMenu.map((parentMenu, index) => {
                            let className =
                                index < 2 ? 'tw-col-span-1' : 'tw-col-span-2';
                            let title = parentMenu.title;
                            let childrens = parentMenu.childs;

                            return (
                                <div
                                    className={className}
                                    key={`footer-menu-${index}`}
                                >
                                    <div className=''>
                                        <h3 className='tw-text-base tw-leading-6 tw-capitalize tw-mb-4 tw-font-semibold tw-text-[#242424]'>
                                            {title}
                                        </h3>
                                        {childrens.length &&
                                            childrens.map(
                                                (child, childIndex) => {
                                                    if (child.url) {
                                                        return (
                                                            <Link
                                                                key={`footer-menu-${index}-${childIndex}`}
                                                                href={child.url}
                                                            >
                                                                <p className='tw-leading-8 tw-text-[#747474]'>
                                                                    {child.name}
                                                                </p>
                                                            </Link>
                                                        );
                                                    }
                                                    return (
                                                        <p
                                                            className='tw-leading-8 tw-text-[#747474]'
                                                            key={`footer-menu-${index}-${childIndex}`}
                                                        >
                                                            {child.name}
                                                        </p>
                                                    );
                                                }
                                            )}
                                    </div>
                                </div>
                            );
                        })}

                        <div className='tw-col-span-2'>
                            <div>
                                <h3 className='tw-text-base tw-leading-6 tw-capitalize tw-mb-4 tw-font-semibold tw-text-["#242424"]'>
                                    Join Our Newsletter Now
                                </h3>
                                <div>
                                    <p className='tw-leading-8 tw-text-[#747474] tw-mb-3'>
                                        Exceptional quality. Ethical factories.
                                        Sign up to enjoy free U.S. shipping and
                                        returns on your first order.
                                    </p>
                                </div>
                                <SubcribeForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='tw-py-8'>
                <div className='tw-container tw-px-3'>
                    <div className='tw-grid tw-grid-cols-2'>
                        <div className=''>
                            <p className='tw-uppercase tw-text-xs'>
                                © 2023 Made With ❤️ By{' '}
                                <span className='tw-text-[#ff6a28] tw-font-semibold'>
                                    SME+ Dev
                                </span>
                            </p>
                        </div>
                        <div className='tw-text-right'>
                            <ul className='tw-inline-block tw-list-outside'>
                                <li className='tw-inline-block tw-pr-8'>
                                    <a
                                        className='tw-text-[#747474] tw-capitalize tw-text-xs'
                                        href=''
                                    >
                                        Lịch sử đặt hàng
                                    </a>
                                </li>
                                <li className='tw-inline-block tw-pr-8'>
                                    <a
                                        className='tw-text-[#747474] tw-capitalize tw-text-xs'
                                        href=''
                                    >
                                        Danh sách mong muốn
                                    </a>
                                </li>
                                <li className='tw-inline-block tw-pr-8'>
                                    <a
                                        className='tw-text-[#747474] tw-capitalize tw-text-xs'
                                        href=''
                                    >
                                        Tin tức
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
