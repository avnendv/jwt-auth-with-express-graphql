import { createBrowserRouter } from 'react-router-dom'

import _404Page from '@/pages/404Page'
import MainLayout from '@/layouts/MainLayout'

const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        lazy: async () => ({ Component: (await import('@/pages/Home')).default }),
      },
      {
        path: '/login',
        lazy: async () => ({ Component: (await import('@/pages/Login')).default }),
      },
      {
        path: '/register',
        lazy: async () => ({ Component: (await import('@/pages/Register')).default }),
      },
      {
        path: '/profile',
        lazy: async () => ({ Component: (await import('@/pages/Profile')).default }),
      },
    ],
  },
  {
    path: '*',
    element: <_404Page />,
  },
])

export default router
