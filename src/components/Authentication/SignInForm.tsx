import { Button, Form, Input } from 'antd';
import { Icon } from '../general';
import { signinAsync } from '../../redux/authSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

const SignInForm: React.FC<{}> = ({}) => {
    const [form] = Form.useForm();
    const auth = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const onFinish = (values: any) => {
        dispatch(signinAsync(values));
    };

    return (
        <Form layout='vertical' form={form} onFinish={onFinish}>
            <Form.Item
                name='username'
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập tên đăng nhập!',
                    },
                ]}
            >
                <Input
                    prefix={
                        <Icon
                            name='UserOutlined'
                            className='site-form-item-icon'
                        />
                    }
                    size='large'
                    placeholder='Username'
                />
            </Form.Item>
            <Form.Item
                name='password'
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập mật khẩu!',
                    },
                ]}
            >
                <Input.Password
                    prefix={
                        <Icon
                            name='LockOutlined'
                            className='site-form-item-icon'
                        />
                    }
                    size='large'
                    placeholder='Password'
                />
            </Form.Item>
            <Form.Item>
                <Button
                    type='primary'
                    htmlType='submit'
                    className='tw-font-semibold'
                    size='large'
                    block
                >
                    Đăng Nhập
                </Button>
            </Form.Item>
        </Form>
    );
};
export default SignInForm;
