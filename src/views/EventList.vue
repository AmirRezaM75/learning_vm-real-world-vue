<template>
  <div>
    <h1>List of events:</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event"/> <!-- <EventCard></EventCard> -->
    <template v-if="page !== 1">
      <router-link :to="{ name: 'events.index', query: { page : page - 1 }}" rel="prev">Prev Page</router-link>
      <template v-if="hasNextPage"> | </template>
    </template>
    <template v-if="hasNextPage">
      <router-link :to="{ name: 'events.index', query: { page : page + 1 }}" rel="next">Next Page</router-link>
    </template>
  </div>
</template>

<script>
  // @ refers to src directory
  import EventCard from '@/components/EventCard.vue';
  import {mapState} from 'vuex';

  export default {
    name: "EventList",
    components: {
      EventCard
    },
    computed: {
      page() {
        return parseInt(this.$route.query.page) || 1;
      },
      hasNextPage() {
        return this.eventsTotal > this.page * this.perPage;
      },
      ...mapState(['events', 'eventsTotal'])
    },
    created() {
      this.perPage = 3
      /*
      * Setting perPage here and not in data means it won't be reactive.
      * We don't need it to be reactive, and this way our component has access to it.
      */
      this.$store.dispatch('fetchEvents', {
        limit: 3,
        page: this.page
      });
    }
  }
</script>
