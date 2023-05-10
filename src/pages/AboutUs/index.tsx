import { ReactElement } from 'react';
import { NextPageWithLayout } from '../_app';
import { HomeLayout } from '@/layouts';
import {
    Breadcrumb,
    Col,
    Divider,
    Row,
    Typography,
    Image,
    Button,
    Card,
    Space,
} from 'antd';
import { config } from '@/modules/common/utils';
const { Title, Paragraph, Text } = Typography;
const About: NextPageWithLayout = () => {
    return (
        <section className='tw-container tw-pb-9'>
            <Breadcrumb
                className='tw-text-sm tw-py-11'
                items={[
                    {
                        title: 'Trang chủ',
                        href: '/',
                        className: 'hover:tw-text-primaryOrange',
                    },
                    { title: 'Giới thiệu' },
                ]}
            />
            <div className='container'>
                <Row gutter={[24, 48]}>
                    <Col span={24} lg={{ span: 12 }}>
                        <Title level={1}>Chào mừng đến với Panther Shop!</Title>
                        <Paragraph className='tw-text-[15px] tw-leading-5 tw-text-[#747474]'>
                            Quibusdam perspiciatis pariatur magnam ducimus
                            excepturi error libero provident animi laboriosam
                            maiores ad explicabo ea laudantium nostrum dolor
                            distinctio, quas fugiat doloribus, sit, possimus
                            obcaecati ab quo vel commodi eum. Laudantium libero,
                            voluptate rerum sunt hic,
                        </Paragraph>
                        <Paragraph className='tw-text-[15px] tw-leading-5 tw-text-[#747474]'>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Esse numquam blanditiis quos, fuga, aspernatur
                            doloribus expedita, soluta dolore cumque.
                        </Paragraph>

                        <Button className='hover:tw-bg-primaryOrange hover:!tw-text-white'>
                            Xem chi tiết
                        </Button>
                    </Col>
                    <Col span={24} lg={{ span: 12 }}>
                        <Image
                            src={`${config.publicUrl}/images/about/about1.jpg`}
                        />
                    </Col>
                    <Col span={24} md={{ span: 12 }} lg={{ span: 6 }}>
                        <Card
                            className='tw-text-center'
                            hoverable
                            bodyStyle={{
                                paddingTop: '80px',
                                paddingBottom: '80px',
                                backgroundColor: '#f3f3f3',
                            }}
                        >
                            <Space size={[24, 0]}>
                                <Image
                                    src={`${config.publicUrl}/images/about/count.png`}
                                    alt='about-image-1'
                                />
                                <Space direction='vertical' size={[0, 12]}>
                                    <Title
                                        className='!tw-text-left !tw-mb-0'
                                        level={3}
                                    >
                                        2170
                                    </Title>
                                    <Text>HAPPY CUSTOMERS</Text>
                                </Space>
                            </Space>
                        </Card>
                    </Col>
                    <Col span={24} md={{ span: 12 }} lg={{ span: 6 }}>
                        <Card
                            className='tw-text-center'
                            hoverable
                            bodyStyle={{
                                paddingTop: '80px',
                                paddingBottom: '80px',
                                backgroundColor: '#f3f3f3',
                            }}
                        >
                            <Space size={[24, 0]}>
                                <Image
                                    src={`${config.publicUrl}/images/about/count2.png`}
                                    alt='about-image-2'
                                />
                                <Space direction='vertical' size={[0, 12]}>
                                    <Title
                                        className='!tw-text-left !tw-mb-0'
                                        level={3}
                                    >
                                        8080
                                    </Title>
                                    <Text>AWARDS WON</Text>
                                </Space>
                            </Space>
                        </Card>
                    </Col>
                    <Col span={24} md={{ span: 12 }} lg={{ span: 6 }}>
                        <Card
                            className='tw-text-center'
                            hoverable
                            bodyStyle={{
                                paddingTop: '80px',
                                paddingBottom: '80px',
                                backgroundColor: '#f3f3f3',
                            }}
                        >
                            <Space size={[24, 0]}>
                                <Image
                                    src={`${config.publicUrl}/images/about/count3.png`}
                                    alt='about-image-3'
                                />
                                <Space direction='vertical' size={[0, 12]}>
                                    <Title
                                        className='!tw-text-left !tw-mb-0'
                                        level={3}
                                    >
                                        2150
                                    </Title>
                                    <Text>HOURS WORKED</Text>
                                </Space>
                            </Space>
                        </Card>
                    </Col>
                    <Col span={24} md={{ span: 12 }} lg={{ span: 6 }}>
                        <Card
                            className='tw-text-center'
                            hoverable
                            bodyStyle={{
                                paddingTop: '80px',
                                paddingBottom: '80px',
                                backgroundColor: '#f3f3f3',
                            }}
                        >
                            <Space size={[24, 0]}>
                                <Image
                                    src={`${config.publicUrl}/images/about/count4.png`}
                                    alt='about-image-4'
                                />
                                <Space direction='vertical' size={[0, 12]}>
                                    <Title
                                        className='!tw-text-left !tw-mb-0'
                                        level={3}
                                    >
                                        2170
                                    </Title>
                                    <Text>COMPLETE PROJECTS</Text>
                                </Space>
                            </Space>
                        </Card>
                    </Col>
                    <Col span={24} lg={{ span: 12 }}>
                        <Image
                            src={`${config.publicUrl}/images/about/about2.jpg`}
                        />
                    </Col>
                    <Col span={24} lg={{ span: 12 }}>
                        <Title level={1}>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. !
                        </Title>
                        <Paragraph className='tw-text-[15px] tw-leading-5 tw-text-[#747474]'>
                            Quibusdam perspiciatis pariatur magnam ducimus
                            excepturi error libero provident animi laboriosam
                            maiores ad explicabo ea laudantium nostrum dolor
                            distinctio, quas fugiat doloribus, sit, possimus
                            obcaecati ab quo vel commodi eum. Laudantium libero,
                            voluptate rerum sunt hic,
                        </Paragraph>
                        <Paragraph className='tw-text-[15px] tw-leading-5 tw-text-[#747474]'>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Esse numquam blanditiis quos, fuga, aspernatur
                            doloribus expedita, soluta dolore cumque.
                        </Paragraph>

                        <Button className='hover:tw-bg-primaryOrange hover:!tw-text-white'>
                            Xem chi tiết
                        </Button>
                    </Col>
                </Row>
            </div>
            <Divider />
        </section>
    );
};

About.getLayout = function getLayout(page: ReactElement) {
    return <HomeLayout>{page}</HomeLayout>;
};

export default About;
