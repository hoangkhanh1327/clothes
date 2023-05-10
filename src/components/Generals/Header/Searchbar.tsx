import { FormEvent, useRef } from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';

function SearchBar() {
    const searchTerm = useRef(null);
    const router = useRouter();

    const handleStartSearch = (e: FormEvent) => {
        e.preventDefault();
        if (searchTerm.current) {
            const { value } = searchTerm.current;
            if (value) {
                router.push(`/san-pham?q=${value}`);
            }
        }
    };

    return (
        <form
            onSubmit={(e) => handleStartSearch(e)}
            className='tw-flex-1 lg:!tw-w-[274px] tw-relative  tw-flex tw-items-center tw-justify-center tw-rounded-[50px] tw-border tw-border-solid tw-border-[#ddd] tw-text-[13px]'
        >
            <input
                className='tw-w-full tw-h-[46px] tw-leading-[48px] tw-bg-transparent tw-transition-all tw-duration-300 tw-pr-[70px] tw-pl-[20px] tw-outline-none tw-text-inputColor'
                placeholder='Nhập tên sản phẩm ....'
                type='text'
                ref={searchTerm}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleStartSearch(e);
                    }
                }}
            />
            <button
                title='Search'
                type='submit'
                className='tw-absolute tw-h-full tw-right-0 tw-top-0 tw-text-2xl tw-w-12 tw-transition-all tw-duration-300 tw-text-[#747474] tw-leading-[52px] hover:tw-text-[#ff6a28] tw-flex tw-items-center tw-justify-center'
            >
                <FontAwesomeIcon icon={faSearch} className='tw-text-sm' />
            </button>
        </form>
    );
}

export default SearchBar;
