<template>
  <div>
    <h1>List of events:</h1>
    <EventCard/> <!-- <EventCard></EventCard> -->
  </div>
</template>

<script>
  // @ refers to src directory
  import EventCard from '@/components/EventCard.vue';
  export default {
    name: "index",
    components: {
      EventCard
    }
  }
</script>
