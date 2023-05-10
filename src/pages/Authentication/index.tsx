import { Image, Space, Typography, Tabs } from 'antd';
import React from 'react';
import { config } from '../../utils';
import { SignInForm, RegisterForm } from '../../components/Authentication';

const { Text } = Typography;

const Authentication: React.FC<{}> = () => {
    return (
        <main className='tw-h-screen tw-overflow-auto tw-flex tw-flex-col'>
            <header className='tw-h-10'></header>
            <article className='tw-pt-8 tw-pb-6 tw-flex-1'>
                <div className='tw-pt-8 tw-pb-6 tw-h-full tw-flex tw-flex-col'>
                    <div className='tw-text-center'>
                        <Space size={[16, 0]}>
                            <span className='tw-align-top'>
                                <Image
                                    width={44}
                                    height={44}
                                    src={`${config.publicUrl}/images/android-chrome-192x192`}
                                    alt='logo'
                                    preview={false}
                                    placeholder={true}
                                />
                            </span>

                            <Text className='tw-text-3xl tw-text-black tw-leading-10'>
                                Assistant
                            </Text>
                        </Space>
                        <div className='tw-text-center tw-mt-3 tw-mb-12'>
                            <Text className='tw-text-sm tw-text-[#00000073]'>
                                Imporve your working performance today !!
                            </Text>
                        </div>
                    </div>
                    <div className='tw-min-w-[328px] max-w-[500px] tw-mx-auto'>
                        <Tabs
                            defaultActiveKey='1'
                            centered
                            items={[
                                {
                                    key: '1',
                                    label: (
                                        <Text className='tw-capitalize tw-font-semibold'>
                                            Đăng nhập
                                        </Text>
                                    ),
                                    children: <SignInForm />,
                                },
                                {
                                    key: '2',
                                    label: (
                                        <Text className='tw-capitalize tw-font-semibold'>
                                            Đăng ký
                                        </Text>
                                    ),
                                    children: <RegisterForm />,
                                },
                            ]}
                        />
                    </div>
                </div>
            </article>
            <footer className='tw-bg[##f0f2f5]'>
                <div className='tw-mt-12 tw-mb-6 tw-px-4 tw-text-center'>
                    <div className='tw-mb-2'>
                        <span>Assistant </span>
                        <span>Happy Working </span>
                    </div>
                </div>
            </footer>
        </main>
    );
};

export default Authentication;
