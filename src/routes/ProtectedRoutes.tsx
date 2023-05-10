const ProtectedRoutes = {
    Accounts: {
        name: 'Tài khoản',
        path: '/tai-khoan',
        icon: 'SafetyOutlined',
        parentId: 0,
        id: 1,
    },

    AccountList: {
        name: 'Nhóm tài khoản',
        path: '/nhom-tai-khaoan',
        icon: 'ApartmentOutlined',
        parentId: 1,
    },

    Business: {
        name: 'Kinh doanh',
        path: '/business',
        icon: 'FundOutlined',
        parentId: 0,
        id: 3,
    },
    Goods: {
        name: 'Hàng hóa',
        path: '/hang-hoa',
        icon: 'AppstoreOutlined',
        parentId: 3,
    },

    UserInfo: {
        path: '/ca-nhan',
    },
};

export default ProtectedRoutes;
