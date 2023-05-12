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

export const getProductAsync = createAsyncThunk('product', async (params: any) => {
  const response: any = await ProductServices.getProducts(params)
  return response.data
})

const initialState: ProductState = {
  productCategories: [],
  productTags: [],
  products: [],
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
          name: 'Total',
          count: 60
        },
        {
          id: 1,
          name: 'Womens',
          count: 10
        },
        {
          id: 2,
          name: 'Men',
          count: 20
        },
        {
          id: 3,
          name: 'Kids',
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
    builder.addCase(getProductAsync.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(getProductAsync.fulfilled, (state, action) => {
      state.products = action.payload.data
      state.totalProducts = action.payload.data.total
      state.loading = false
    })
  }
})

export const productState = (state: RootState) => state.product
export const { setFilters, setQuickViewProduct } = productSlice.actions

export default productSlice.reducer
