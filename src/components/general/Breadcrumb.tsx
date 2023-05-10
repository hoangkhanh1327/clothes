import React from 'react';
import { Breadcrumb } from 'antd';

const HomeBreadcrumb: React.FC<{}> = ({}) => {
    return (
        <Breadcrumb
            style={{ margin: '16px 0' }}
            items={[
                {
                    title: 'Home',
                    href: '/',
                },
                {
                    title: 'Page',
                    href: '/',
                },
            ]}
        />
    );
};

export default HomeBreadcrumb;
