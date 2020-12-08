<template>
  <div>
    <h1>List of events:</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event"/> <!-- <EventCard></EventCard> -->
  </div>
</template>

<script>
  // @ refers to src directory
  import EventCard from '@/components/EventCard.vue';
  import EventService from '@/services/EventService';
  export default {
    name: "index",
    components: {
      EventCard
    },
    data() {
      return {
        events: []
      }
    },
    created() {
      EventService.getEvents()
      .then(response => {
        this.events = response.data;
      })
      .catch(error => {
        console.log(error);
      });
    }
  }
</script>
