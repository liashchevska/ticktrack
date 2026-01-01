import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import SignupView from '@/views/SignupView.vue'
import EmailVerificatoinView from '@/views/EmailVerificatoinView.vue'
import { useAuthStore } from '@/stores/auth'
import PasswordResetView from '@/views/PasswordResetView.vue'
import { storeToRefs } from 'pinia'
import { useBoardStore } from '@/stores/board'
import BoardDetailView from '@/views/BoardDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/boards' },
    {
      path: '/boards',
      component: HomeView,
      children: [
        {
          path: ':id',
          component: BoardDetailView
        }
      ],
      meta: {
        requiresAuth: true,
        requiresBoardList: true,
      },
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

router.beforeEach(async (to, from) => {
  const { isAuthenticated, isVerificationPending } = storeToRefs(useAuthStore())
  const { initBoardList } = useBoardStore()
  if (to.meta.requiresAuth && !isAuthenticated) {
    return '/login'
  }
  if (to.meta.requiresVerificationPending && !isVerificationPending) {
    return '/'
  }
  if (to.meta.requiresNoAuth && isAuthenticated) {
    return '/'
  }
  // Prefetch board list on page load.
  if (to.meta.requiresBoardList) {
    await initBoardList()
  }
})

export default router
