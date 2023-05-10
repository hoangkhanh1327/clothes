interface AccountType {
    key: React.Key | null;
    id: number | null;
    username: string;
    password: string;
    accounttypeid?: number;
    accounttypename?: string;
    website?: string;
    note?: string;
    created_at: string;
    updated_at?: string;
}

interface AccountTypeType {
    key: React.Key | null;
    id: number | null;
    name: string;
    color: string;
    textColor: string;
    created_at: string;
    updated_at?: string;
}

interface CreateAccountParamsType extends Partial<AccountType> {}

interface UpdateAccountParamsType extends Partial<AccountType> {}

interface CreateAccountTypeParamsType extends Partial<AccountTypeType> {}

interface UpdateAccountTypeParamsType extends Partial<AccountTypeType> {}

export type {
    AccountType,
    AccountTypeType,
    CreateAccountParamsType,
    UpdateAccountParamsType,
    CreateAccountTypeParamsType,
    UpdateAccountTypeParamsType,
};
