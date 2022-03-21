<template>
    <h1>This is the TutorsListPage !!!</h1>
    <div v-if="isLoading">Loading... Please, wait...</div>
    <div v-else>
        <h1>Content</h1>
        <button @click="loadTutors(true)">Refresh</button>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                isLoading: false,
                error: null,
                activeFilters: {
                    frontend: true,
                    backend: true,
                    career: true,
                }
            };
        },
        created() {
            this.loadTutors();
        },
        computed: {
            myTutors() {
                const myTutors = this.$store.getters['tutors/tutors'];
                return myTutors;
            }
        },
        methods: {
            async loadTutors(refresh = false) {
                this.isLoading = true;
                try {
                    await this.$store.dispatch('tutors/loadTutors', {
                      forceRefresh: refresh,
                    });
                } catch (error) {
                    this.error = error.message || 'Something went wrong!';
                }

                this.isLoading = false;
            },
        }
    };
</script>
