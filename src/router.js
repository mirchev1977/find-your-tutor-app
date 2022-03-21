import { createRouter, createWebHistory } from 'vue-router';

import TutorsList from './pages/tutors/TutorsList.vue';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/tutors' },
        { path: '/tutors', component: TutorsList },
    ]
});

export default router;
