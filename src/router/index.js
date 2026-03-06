import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import SignupView from '@/views/SignupView.vue'
import EmailVerificatoinView from '@/views/EmailVerificatoinView.vue'
import { useAuthStore } from '@/stores/auth'
import PasswordResetView from '@/views/PasswordResetView.vue'
import { storeToRefs } from 'pinia'
import { useBoardStore } from '@/stores/board'
import BoardDetail from '@/components/Board/BoardDetail.vue'
import AppLayout from '@/layouts/AppLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', redirect: '/home' },
    {
      component: AppLayout,
      children: [
        {
          path: '/home/:id?',
          name: 'home',
          component: HomeView
        }
      ],
      meta: {
        requiresAuth: true,
        requiresBoardList: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresNoAuth: true }
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView,
      meta: { requiresNoAuth: true }
    },
    {
      path: '/email/verify',
      name: 'email-verify',
      component: EmailVerificatoinView,
      meta: { requiresVerificationPending: true }
    },
    {
      path: '/password/request',
      name: 'password-reset',
      component: PasswordResetView,
      meta: { requiresNoAuth: true }
    }

  ],
})

router.beforeEach(async (to, from) => {
  const { isAuthenticated, isVerificationPending } = storeToRefs(useAuthStore())
  const { initBoardList } = useBoardStore()
  if (to.matched.some(r => r.meta.requiresAuth) && !isAuthenticated.value) {
    return '/login'
  }
  if (to.matched.some(r => r.meta.requiresVerificationPending) && !isVerificationPending.value) {
    return '/'
  }
  if (to.matched.some(r => r.meta.requiresNoAuth) && isAuthenticated.value) {
    return '/'
  }
  // Prefetch board list on page load.
  if (to.matched.some(r => r.meta.requiresBoardList)) {
    await initBoardList()
  }
})

export default router
