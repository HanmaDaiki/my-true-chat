declare global {
  declare type AppDispatch = import('@app/store').AppDispatch;
  declare type RootState = import('@app/store').RootState;
}

export {}