import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IPost } from '../types/dataTypes';
import { userServerConnect } from '../utils/http-methods/userMethods';



export interface searchState {
  data: IPost[] | null;
  posts:IPost[] | null;
  loading:boolean;
  error:boolean;
}

const initialState: searchState  = {
  data:null,
  posts:null,
  loading:true,
  error:false,
}

export const searchPost = createAsyncThunk('/search/searchPost',async(query:string)=>{
  const response = await userServerConnect('GET','posts/search',{query:query});
  
  return {data:response.data,status:Boolean(response.success)};
})

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setData: (state,action: PayloadAction<IPost[]>) => {
      
      state.data = action.payload;

    },
    removeData: (state) => {
      state.data = null;
    },
    updatePost(state,action:PayloadAction<number>){
      const id = action.payload;
      const indexInData = state.data?.findIndex((item)=>Number(item.post_id) === id);
      const indexInPosts = state.data?.findIndex((item)=>Number(item.post_id) === id);
      
      if(indexInData!== -1 && state.data){
        state.data[indexInData!].applied = String(true);
      }
      if(indexInPosts!== -1 && state.posts){
        state.posts[indexInPosts!].applied = String(true);
      }
    },
    applyFilter:(state,action:PayloadAction<{location:string[],experience:number}>)=>{
      const {location,experience} = action.payload; 
      if(location.length === 0 && experience === -1){
        state.posts = state.data;
      }
      else if(state.data){
        const filterData = state.data.filter((post)=>{
          if(location.includes(post.location.toLowerCase()) && Number(post.experience) <= experience){
            return true;
          }
          if(location.length === 0 && Number(post.experience) <= experience){
            return true;
          }
          return false;
        })
        state.posts = filterData;
      }

    }
  },
  extraReducers(builder) {
    builder.addCase(searchPost.pending,(state,action)=>{
      state.error = false;
      state.loading = true;
    })
    builder.addCase(searchPost.fulfilled,(state,action)=>{
    
      if(action.payload.status){
        state.data = action.payload.data;
        state.posts = action.payload.data;
      }
      else{
        state.error = true;
      }
      state.loading = false;
    })
    builder.addCase(searchPost.rejected,(state,action)=>{
      state.loading = false;
      state.error = true;
    })
  },
})


export const searchActions = searchSlice.actions

export default searchSlice;