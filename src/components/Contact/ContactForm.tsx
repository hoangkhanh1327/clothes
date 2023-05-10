import { Button, Form, Input } from 'antd';
const { TextArea } = Input;
const ContactForm = () => {
    return (
        <div>
            <Form layout='vertical'>
                <Form.Item required label='Họ tên' name={'fullname'}>
                    <Input placeholder='Trần Văn A ...' />
                </Form.Item>
                <Form.Item
                    name={'email'}
                    required
                    label='Địa chỉ email'
                    rules={[{ type: 'email', required: true }]}
                >
                    <Input placeholder='abc@gmail.com...' />
                </Form.Item>
                <Form.Item required label='Chủ đề' name={'title'}>
                    <Input />
                </Form.Item>
                <Form.Item required label='Chủ đề' name={'content'}>
                    <TextArea rows={4} placeholder='Lời nhắn ...' />
                </Form.Item>
                <Form.Item wrapperCol={{ span: 16 }}>
                    <Button
                        size='large'
                        type='primary'
                        htmlType='submit'
                        className='tw-bg-primaryOrange tw-font-semibold tw-min-w-[140px] hover:!tw-bg-black'
                    >
                        Gửi
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ContactForm;
