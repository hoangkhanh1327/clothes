import { BlogList } from '@/modules/common/components/Generals/Blogs';
import React, { ReactElement } from 'react';
import { NextPageWithLayout } from '../_app';
import { BlogLayout, HomeLayout } from '@/layouts';

const Blogs: NextPageWithLayout = ({}) => {
    return <BlogList />;
};

Blogs.getLayout = function getLayout(page: ReactElement) {
    return (
        <HomeLayout>
            <BlogLayout>{page}</BlogLayout>
        </HomeLayout>
    );
};

export default Blogs;
