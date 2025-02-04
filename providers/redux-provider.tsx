'use client'
//redux is a client component
import store from '@/store/store'
import React, { useEffect, useState } from 'react'
//import The provider and store
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

let persistor = persistStore(store)

export default function ReduxProvider({children}:{children:React.ReactNode}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;
  return (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
    </Provider>
  )
}
