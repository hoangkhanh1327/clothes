enum StatusTypes {
  SUCCESS = 'success',
  ERROR = 'error',
  LOADING = 'loading'
}

enum Breakpoints {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
  XXL = 'xxl'
}

interface ListParams {
  page: number
  pageSize: number
  status?: StatusTypes
  keyword?: string
}

interface AppState {
  isMobile: boolean
  currentBreakpoint?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  mobileNavVisible: boolean
}
export { Breakpoints, StatusTypes }
export type { ListParams, AppState }
