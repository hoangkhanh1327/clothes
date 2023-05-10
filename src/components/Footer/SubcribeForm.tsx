import { useRef, useState } from 'react';

function SubcribeForm() {
    const emailRef = useRef<any>(null);
    const [errors, setErrors] = useState<string>('');

    const onSubmit = () => {
        const value = emailRef.current.value;
        if (value) {
            setErrors('');
            alert('Cảm ơn bạn đã đăng ký website của chúng tôi');
        } else {
            setErrors('Địa chỉ email không hợp lệ');
        }
    };

    return (
        <div>
            <input
                className='tw-block tw-px-5 tw-w-full tw-mb-3 tw-h-[45px] tw-rounded-sm tw-border tw-border-solid tw-border-gray-300'
                ref={emailRef}
                type='email'
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        onSubmit();
                    }
                }}
                placeholder='Nhập địa chỉ email của bạn ....'
            />
            <button
                className='tw-px-3 tw-mt-2 tw-text-white tw-font-semibold tw-text-xs tw-leading-[45px] tw-block tw-uppercase tw-w-full tw-rounded tw-transition-all tw-duration-300 tw-bg-[#242424] hover:tw-bg-[#ff6a28]'
                onClick={() => onSubmit()}
            >
                Đăng ký!
            </button>
            {errors && errors !== '' ? (
                <div className='tw-py-1'>
                    <p className='tw-text-sm tw-text-red-600'>{errors}</p>
                </div>
            ) : null}
        </div>
    );
}

export default SubcribeForm;
