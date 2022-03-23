import { createRouter, createWebHistory } from 'vue-router';

import TutorsList from './pages/tutors/TutorsList.vue';
import TutorRegistation from './pages/tutors/TutorRegistration.vue';
import NotFound from './pages/NotFound.vue';
import UserAuth from './pages/auth/UserAuth.vue';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/tutors' },
        { path: '/tutors', component: TutorsList },
        { path: '/register', component: TutorRegistation, meta: { requiresAuth: true } },
        { path: '/auth', component: UserAuth, meta: { requiresUnauth: true } },
        { path: '/:notFound(.*)', component: NotFound }
    ]
});

export default router;
