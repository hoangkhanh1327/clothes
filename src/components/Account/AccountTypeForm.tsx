import React, { useEffect } from 'react';
import { Modal, Form, Input, Row, Col, Select, Button, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Colorpicker, ColorPickerValue } from 'antd-colorpicker';
import {
    toggleTypeFormVisible,
    createAccountTypeAsync,
    updateAccountTypeAsync,
} from '../../redux/reducers/accountSlice';

const { Title } = Typography;

export default function AccountTypeForm() {
    const [form] = Form.useForm();
    const { isTypeFormVisible, status, typeFormData, accountTypes } =
        useAppSelector((state) => state.account);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isTypeFormVisible) {
            form.resetFields();
        }
    }, [isTypeFormVisible]);

    const handleSubmit = async (values: any) => {
        if (typeFormData?.id) {
            dispatch(
                updateAccountTypeAsync({
                    ...typeFormData,
                    ...values,
                })
            );
        } else {
            dispatch(
                createAccountTypeAsync({
                    name: values?.name,
                    color: values.color.hex,
                    textColor: values?.textColor.hex,
                })
            );
        }
    };
    const onCloseModal = () => {
        form.resetFields();
        dispatch(toggleTypeFormVisible({ visible: false }));
    };

    return (
        <Modal
            title={
                <Title level={3} className='tw-font-semibold tw-mt-0'>
                    {typeFormData ? 'Chỉnh sửa' : 'Thêm mới'} loại tài khoản
                </Title>
            }
            open={isTypeFormVisible}
            onCancel={onCloseModal}
            forceRender={true}
            footer={[
                <Button key='back' onClick={onCloseModal}>
                    Huỷ
                </Button>,
                <Button
                    key='submit'
                    className='tw-bg-blue-500'
                    type='primary'
                    loading={status === 'loading'}
                    onClick={form.submit}
                >
                    Xác nhận
                </Button>,
            ]}
        >
            <Form
                initialValues={{
                    name: typeFormData?.name,
                    color: typeFormData?.color,
                    textColor: typeFormData?.textColor,
                }}
                form={form}
                onFinish={handleSubmit}
                layout='vertical'
            >
                <Row gutter={12}>
                    <Col span={24}>
                        <Form.Item
                            name='name'
                            label={
                                <label className='tw-font-semibold tw-text-sm'>
                                    Tên nhãn
                                </label>
                            }
                            required
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập tên nhãn !!',
                                },
                            ]}
                        >
                            <Input placeholder='Test' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={12}>
                    <Col span={24} md={{ span: 12 }}>
                        <Form.Item
                            name='color'
                            label={
                                <label className='tw-font-semibold tw-text-sm'>
                                    Màu nền
                                </label>
                            }
                        >
                            <Colorpicker />
                        </Form.Item>
                    </Col>
                    <Col span={24} md={{ span: 12 }}>
                        <Form.Item
                            name='textColor'
                            label={
                                <label className='tw-font-semibold tw-text-sm'>
                                    Màu chữ
                                </label>
                            }
                        >
                            <Colorpicker />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}
