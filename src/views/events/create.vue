<template>
  <div>
    <h1>Create an event: {{ user.username }}</h1>
    <ul>
      <li v-for="(category, index) in categories" v-text="category" :key="index"></li>
    </ul>
    <h2>Main Events</h2>
    <ul>
      <li v-for="(event, index) in mainEvents" v-text="event.title" :key="index"></li>
    </ul>
    <p>Sub events count: {{ $store.getters.subEventsCount }}</p>
    <p>{{ getEventById(3) }}</p>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex';

export default {
  name: "create",
  computed: {
    mainEvents() {
      return this.$store.getters.mainEvents
    },
    ...mapGetters(['getEventById']),
    ...mapState(['user', 'categories'])
  }
}
</script>

<style scoped>

</style>
