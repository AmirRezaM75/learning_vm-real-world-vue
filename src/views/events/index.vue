<template>
  <div>
    <h1>List of events:</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event"/> <!-- <EventCard></EventCard> -->
    <template v-if="page !== 1">
      <router-link :to="{ name: 'events.index', query: { page : page - 1 }}" rel="prev">Prev Page</router-link> |
    </template>
    <template v-if="$store.state.total > page * 3">
      <router-link :to="{ name: 'events.index', query: { page : page + 1 }}" rel="next">Next Page</router-link>
    </template>
  </div>
</template>

<script>
  // @ refers to src directory
  import EventCard from '@/components/EventCard.vue';
  import {mapState} from 'vuex';

  export default {
    name: "index",
    components: {
      EventCard
    },
    computed: {
      page() {
        return parseInt(this.$route.query.page) || 1;
      },
      ...mapState(['events'])
    },
    created() {
      this.$store.dispatch('fetchEvents', {
        limit: 3,
        page: this.page
      });
    }
  }
</script>
