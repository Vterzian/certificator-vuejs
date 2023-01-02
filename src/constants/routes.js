import DefaultLayout from '@/components/layouts/DefaultLayout.vue'

const routes = [
  {
    name: 'logIn',
    path: '',
    component: () => import('@/components/LogIn.vue'),
  },
  {
    name: 'DefaultLayout',
    path: '',
    component: DefaultLayout,
    children: [
      {
        name: 'home',
        path: '/home',
        component: () => import('@/components/Home.vue'),
      },
      {
        name: 'artworkList',
        path: '/artworks',
        component: () => import('@/components/ArtworkList.vue'),
      },
      {
        name: 'certificateList',
        path: '/certificates',
        component: () => import('@/components/CertificateList.vue'),
      },
    ],
  },
];

export default routes;