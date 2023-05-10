import React, { useState } from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const HomeFooter: React.FC<{}> = ({}) => {
    return (
        <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2023 Created by Ant UED
        </Footer>
    );
};

export default HomeFooter;
