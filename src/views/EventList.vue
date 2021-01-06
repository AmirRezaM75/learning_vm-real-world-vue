<template>
  <div>
    <h1>Events for {{ user.user.username }}</h1>
    <EventCard v-for="event in event.events" :key="event.id" :event="event"/> <!-- <EventCard></EventCard> -->
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
  import { mapState } from 'vuex';
  import store from '@/store/index';

  function getPageEvents(routeTo, next) {
    const currentPage = parseInt(routeTo.query.page) || 1;
    store.dispatch('event/fetchEvents', {
      page: currentPage
    }).then( () => {
      routeTo.params.page = currentPage;
      next();
    });
  }

  export default {
    name: "EventList",
    props: {
      page: {
        type: Number,
        required: true
      }
    },
    components: {
      EventCard
    },
    beforeRouteEnter(routeTo, routeFrom, next) {
      getPageEvents(routeTo, next);
    },
    beforeRouteUpdate(routeTo, routeFrom, next) {
      getPageEvents(routeTo, next);
    },
    computed: {
      hasNextPage() {
        return this.event.eventsTotal > this.page * this.event.limit;
      },
      ...mapState(['event', 'user'])
    }
  }
</script>
