import { createStore } from 'vuex';

import tutorsModule from './modules/tutors/index.js';
import authModule from './modules/auth/index.js';

const store = createStore({
    modules: {
        tutors: tutorsModule,
        auth: authModule
    }
});

export default store;
