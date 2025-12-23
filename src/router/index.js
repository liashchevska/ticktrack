import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import SignupView from '@/views/SignupView.vue'
import EmailVerificatoinView from '@/views/EmailVerificatoinView.vue'
import { useAuthStore } from '@/stores/auth'
import PasswordResetView from '@/views/PasswordResetView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      component: LoginView,
      meta: { requiresNoAuth: true }
    },
    {
      path: '/signup',
      component: SignupView,
      meta: { requiresNoAuth: true }

    },
    {
      path: '/email/verify',
      component: EmailVerificatoinView,
      meta: { requiresVerificationPending: true }
    },
    {
      path: '/password/request',
      component: PasswordResetView,
      meta: { requiresNoAuth: true }
    }

  ],
})


router.beforeEach((to, from) => {
  const { isAuthenticated, isVerificationPending } = useAuthStore()

  if (to.meta.requiresAuth && !isAuthenticated) {
    return '/login'
  }
  if (to.meta.requiresVerificationPending && !isVerificationPending) {
    return '/'
  }
  if (to.meta.requiresNoAuth && isAuthenticated) {
    return '/'
  }
})

export default router
