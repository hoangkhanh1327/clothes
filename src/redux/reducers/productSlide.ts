import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { ProductState } from '../../interfaces'
import { ProductServices } from '~/services'

export const getCategoriesAsync = createAsyncThunk('productCategory', async (params: any) => {
  const response = await ProductServices.getProductCategory(params)
  return response.data
})

export const getProductTagsAsync = createAsyncThunk('productTags', async (params: any) => {
  const response = await ProductServices.getProductTags(params)
  return response.data
})

const initialState: ProductState = {
  productCategories: [],
  productTags: [],
  totalProducts: 0,
  loading: false
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload
    },
    setQuickViewProduct: (state, action) => {
      state.quickViewProduct = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getCategoriesAsync.fulfilled, (state, action) => {
      state.productCategories = action.payload
    })
    builder.addCase(getCategoriesAsync.rejected, (state, action) => {
      state.productCategories = [
        {
          id: 99,
          name: 'Tất cả',
          value: '',
          count: 60
        },
        {
          id: 1,
          name: 'Phụ nữ',
          value: 'WOMEN',
          count: 10
        },
        {
          id: 2,
          name: 'Đàn ông',
          value: 'MEN',
          count: 20
        },
        {
          id: 3,
          name: 'Trẻ em',
          value: 'KID',
          count: 30
        }
      ]
    })
    builder.addCase(getProductTagsAsync.fulfilled, (state, action) => {
      state.productTags = action.payload
    })
    builder.addCase(getProductTagsAsync.rejected, (state, action) => {
      state.productTags = ['tag1', 'tag2', 'tag3', 'tag4', 'tag5']
    })
  }
})

export const productState = (state: RootState) => state.product
export const { setFilters, setQuickViewProduct } = productSlice.actions

export default productSlice.reducer
