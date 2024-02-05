import React from 'react'
import ReactDOM from 'react-dom/client'
import NewsApp from './NewsApp'
import './main.scss'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
     
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter 
        basename={import.meta.env.BASE_URL} >
          <NewsApp />
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
)
