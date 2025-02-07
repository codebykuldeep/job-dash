import React, { PropsWithChildren } from "react";
import { render, RenderOptions } from "@testing-library/react";

import { Provider } from "react-redux";
//import {  setupStore } from "./store-init";
import { BrowserRouter } from "react-router-dom";
import { configureStore, Reducer, UnknownAction } from "@reduxjs/toolkit";
import userSlice, { UserState } from "../store/userSlice";
import searchSlice, { searchState } from "../store/searchSlice";
import { AppStore, RootState } from "../store/store";


interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: Partial<RootState>
    store?: AppStore
  }
  
  export function renderWithProviders(
    ui: React.ReactElement,
    extendedRenderOptions: ExtendedRenderOptions = {}
  ) {
    const {
        preloadedState = {},
        // Automatically create a store instance if no store was passed in
        //store = setupStore(preloadedState),
        store = configureStore({
          reducer: {
            userSlice:userSlice.reducer as Reducer<UserState, UnknownAction, UserState | undefined>,
            searchSlice:searchSlice.reducer as Reducer<searchState, UnknownAction, searchState | undefined>,
          },
            preloadedState,
        }),
        ...renderOptions
      } = extendedRenderOptions
  
    const Wrapper = ({ children }: PropsWithChildren) => (
      <Provider store={store}>
        <BrowserRouter>
            {children}
        </BrowserRouter>
        </Provider>
    );
  
    // Return an object with the store and all of RTL's query functions
    return {
      store,
      ...render(ui, { wrapper: Wrapper, ...renderOptions })
    }
  }