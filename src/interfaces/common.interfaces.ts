enum StatusTypes {
    SUCCESS = 'success',
    ERROR = 'error',
    LOADING = 'loading',
}

interface ListParams {
    page: number;
    pageSize: number;
    status?: StatusTypes;
    keyword?: string;
}

export type { ListParams };
