import instance from './api';

const getAccountTypeList = (params: any) => {
    return instance.get('/accountType', {
        params,
    });
};

const createAccountType = (params: any) => {
    return instance.post('/accountType', params);
};

const updateAccountType = (params: any) => {
    return instance.put('/accountType', params);
};

const deleteAccountType = (id: any) => {
    return instance.delete(`/accountType/${id}`);
};

const getAccountList = (params: any) => {
    return instance.get('/account', {
        params,
    });
};

const createAccount = (params: any) => {
    return instance.post('/account', params);
};

const updateAccount = (params: any) => {
    return instance.put('/account', params);
};

const deleteAccount = (id: any) => {
    return instance.delete(`/account/${id}`);
};
const AccountSerivces = {
    getAccountTypeList,
    createAccountType,
    updateAccountType,
    deleteAccountType,
    getAccountList,
    createAccount,
    updateAccount,
    deleteAccount,
};
export default AccountSerivces;
