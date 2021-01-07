<template>
  <div>
    <h1>Create an Event</h1>
    <form @submit.prevent="createEvent">
      <BaseSelect label="Select a category" :items="categories" v-model="event.category"/>

      <h3>Name & describe your event</h3>
      <!--
        v-model is syntactic sugar for:
        <tag
          :value="event.title"
          @input="(value) => { event.title = value }
        />
      -->
      <BaseInput label="Title" v-model="event.title" type="text" placeholder="Add an event title"></BaseInput>

      <BaseInput label="Description" v-model="event.description" type="text" placeholder="Add a description"></BaseInput>


      <h3>Where is your event?</h3>
      <BaseInput label="Location" v-model="event.location" type="text" placeholder="Add a location"></BaseInput>

      <h3>When is your event?</h3>

      <div class="field">
        <label>Date</label>
        <datepicker v-model="event.date" placeholder="Select a date"/>
      </div>

      <BaseSelect label="Select a time" :items="times" v-model="event.time"/>

      <input type="submit" class="button -fill-gradient" value="Submit"/>
    </form>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import NProgress from 'nprogress';

export default {
  name: "EventCreate",
  components: {
    Datepicker
  },
  data() {
    const times = [];

    for (let i = 1; i <= 24; i++) {
      times.push(i + ':00')
    }
    return {
      times,
      categories: this.$store.state.categories,
      event: this.createFreshEventObject()
    }
  },
  methods: {
    createFreshEventObject() {
      const user = this.$store.state.user.user;
      const id = Math.floor(Math.random() * 1000000);
      return {
        id: id,
        user: user,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: []
      }
    },
    createEvent() {
      NProgress.start();
      this.$store.dispatch('event/createEvent', this.event).then(() => {
        // 'this' is not working properly if using function() instead of () =>
        this.$router.push({
          name: 'events.show',
          params: { id: this.event.id }
        });
        this.event = this.createFreshEventObject();
      }).catch(() => {
        NProgress.done();
      });
    }
  }
}
</script>

<style scoped>
  .field {
    margin-bottom: 24px;
  }
</style>
