import '../styles/globals.css'
import 'tailwindcss/tailwind.css'

import { ApolloClient, InMemoryCache,ApolloProvider } from '@apollo/client';
import { API_URL } from '../config/config';
import { Provider, useSelector } from "react-redux";
import withReduxStore from "../common/with-redux-store";

import { PersistGate } from "redux-persist/lib/integration/react";
import { persistor, store } from "../redux/store";
import Loading from '../components/Loading';
import { AnimateSharedLayout } from 'framer-motion';


function MyApp({ Component, pageProps,reduxStore }) {
  return (
      <Provider store={reduxStore}>
        <PersistGate loading={<Loading />} persistor={persistor}>
          <AnimateSharedLayout  >
              <Component {...pageProps} />
            </AnimateSharedLayout>
          </PersistGate>
        </Provider>  
  )
}




export default withReduxStore(MyApp)
