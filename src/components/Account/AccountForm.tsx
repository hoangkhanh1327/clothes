import React, { useEffect } from 'react';
import { Modal, Form, Input, Row, Col, Select, Button, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
    createAccountAsync,
    toggleFormVisible,
    updateAccountAsync,
} from '../../redux/reducers/accountSlice';

const { TextArea } = Input;
const { Title } = Typography;

export default function AccountForm() {
    const [form] = Form.useForm();
    const { isFormVisible, status, formData, accountTypes } = useAppSelector(
        (state) => state.account
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isFormVisible) {
            form.resetFields();
        }
    }, [isFormVisible]);

    const handleSubmit = async (values: any) => {
        if (formData?.id) {
            dispatch(
                updateAccountAsync({
                    ...formData,
                    ...values,
                    accounttypeid: values.accounttypeid || null,
                })
            );
        } else {
            dispatch(createAccountAsync(values));
        }
    };
    const onCloseModal = () => {
        form.resetFields();
        dispatch(toggleFormVisible({ visible: false }));
    };

    return (
        <Modal
            title={
                <Title level={3} className='tw-font-semibold tw-mt-0'>
                    {formData ? 'Chỉnh sửa' : 'Thêm mới'} tài khoản
                </Title>
            }
            open={isFormVisible}
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
                    username: formData?.username,
                    password: formData?.password,
                    website: formData?.website,
                    accounttypeid: formData?.accounttypeid,
                    note: formData?.note,
                }}
                form={form}
                onFinish={handleSubmit}
                layout='vertical'
            >
                <Row gutter={12}>
                    <Col span={24} md={{ span: 12 }}>
                        <Form.Item
                            name='username'
                            label={
                                <label className='tw-font-semibold tw-text-sm'>
                                    Tên tài khoản
                                </label>
                            }
                            required
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập tên tài khoản !!',
                                },
                            ]}
                        >
                            <Input autoComplete='off' placeholder='username' />
                        </Form.Item>
                    </Col>
                    <Col span={24} md={{ span: 12 }}>
                        <Form.Item
                            name='password'
                            label={
                                <label className='tw-font-semibold tw-text-sm'>
                                    Mật khẩu
                                </label>
                            }
                            required
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập mật khẩu !!',
                                },
                            ]}
                        >
                            <Input.Password
                                autoComplete='off'
                                placeholder='password '
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={12}>
                    <Col span={24} md={{ span: 12 }}>
                        <Form.Item
                            name='website'
                            label={
                                <label className='tw-font-semibold tw-text-sm'>
                                    Website
                                </label>
                            }
                        >
                            <Input placeholder='http://example.com' />
                        </Form.Item>
                    </Col>
                    <Col span={24} md={{ span: 12 }}>
                        <Form.Item
                            name='accounttypeid'
                            label={
                                <label className='tw-font-semibold tw-text-sm'>
                                    Loại tài khoản
                                </label>
                            }
                        >
                            <Select
                                showSearch
                                allowClear
                                placeholder='Loại tài khoản'
                                filterOption={(input, option) =>
                                    (option?.label ?? '')
                                        .toLowerCase()
                                        .includes(input.toLowerCase())
                                }
                                options={accountTypes.map((accountType) => ({
                                    value: accountType.id,
                                    label: accountType.name,
                                }))}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={12}>
                    <Col span={24}>
                        <Form.Item
                            name='note'
                            label={
                                <label className='tw-font-semibold tw-text-sm'>
                                    Ghi chú
                                </label>
                            }
                        >
                            <TextArea rows={4} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}
