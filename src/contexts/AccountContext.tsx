import React, { useContext, useState } from 'react';
import { AccountSerivces } from '../services';
import type { AccountType } from '../interfaces';

interface NotificationType {
    type: 'success' | 'info' | 'error' | 'warning';
    title: string;
    message?: string;
}

export const AccountContext = React.createContext<any | null>(null);

export function useAccount() {
    const accountContext = useContext(AccountContext);
    if (!accountContext) {
        throw new Error('useAccount has to be used within AccountProvider');
    }
    return accountContext;
}

export const AccountProvider: React.FC<{ children: any }> = ({ children }) => {
    const [accounts, setAccounts] = useState<AccountType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [total, setTotal] = useState<number>(0);
    const [notifications, setNotifications] = useState<NotificationType | null>(
        null
    );
    const [isFormVisible, setFormVisible] = useState<boolean>(false);
    const [formData, setFormData] = useState(null);
    const [filters, setFilters] = useState<any>({
        page: 1,
        pageSize: 10,
    });

    const createAccount = async (params: any) => {
        try {
            const res = await AccountSerivces.createAccount(params);
            const updatedAccounts = accountState?.accounts
                ? [res.data, ...accountState?.accounts]
                : [res.data];
            setAccounts(updatedAccounts);
            setTotal(updatedAccounts.length);
            setFormData(null);
            setFormVisible(false);
            setNotifications({
                type: 'success',
                title: 'Tạo mới thành công!',
                message: 'Tài khoản đã được tạo !',
            });
        } catch (error: any) {
            setNotifications({
                type: 'error',
                title: 'Tạo mới không thành công!',
                message: error?.message,
            });
        }
    };

    const updateAccount = async (params: any) => {
        try {
            const res: any = await AccountSerivces.updateAccount(params);
            const updatedAccounts = accountState?.accounts?.map(
                (account: any) => {
                    if (account.id === res.updated.id) {
                        return res.updated;
                    }
                    return account;
                }
            );
            setAccounts(updatedAccounts);
            setTotal(updatedAccounts.length);
            setFormData(null);
            setFormVisible(false);
            setNotifications({
                type: 'success',
                title: 'Cập nhật thành công!',
                message: 'Tài khoản đã được tạo !',
            });
        } catch (error: any) {
            setNotifications({
                type: 'error',
                title: 'Cập nhật mới không thành công!',
                message: error?.message,
            });
        }
    };

    const deleteAccount = async (id: string) => {
        setLoading(true);
        try {
            const res: any = await AccountSerivces.deleteAccount(id);
            const updatedAccounts = accounts?.filter(
                (account: any) => account.id !== res.id
            );
            setAccounts(updatedAccounts);
            setTotal(updatedAccounts.length);
        } catch (error: any) {
            setNotifications({
                type: 'error',
                title: 'Lỗi',
                message: error?.message,
            });
        } finally {
            setLoading(false);
        }
    };

    const toggleFormVisible = (status: boolean, formData?: any) => {
        setFormVisible(status);
        if (!status) {
            setFormData(null);
        } else {
            setFormData(formData);
        }
    };

    const accountState = {
        accounts,
        loading,
        filters,
        total,
        notifications,
        isFormVisible,
        formData,
    };

    const accountActions = {
        setAccounts,
        createAccount,
        updateAccount,
        deleteAccount,
        setFilters,
        toggleFormVisible,
        setTotal,
    };

    return (
        <AccountContext.Provider value={[accountState, accountActions]}>
            {children}
        </AccountContext.Provider>
    );
};

export {};
