<template>
  <div>
    <h1>Create an Event</h1>
    <form @submit.prevent="createEvent">
      <BaseSelect
          label="Select a category"
          :items="categories"
          v-model="event.category"
          :class="{ error: $v.event.category.$error }"
          @blur="$v.event.category.$touch()"
      />
      <template v-if="$v.event.category.$error">
        <p v-if="!$v.event.category.required" class="errorMessage">Category is required</p>
      </template>

      <h3>Name & describe your event</h3>
      <BaseInput
          label="Title"
          v-model="event.title"
          type="text"
          :class="{ error: $v.event.title.$error }"
          @blur="$v.event.title.$touch()"
          placeholder="Add an event title"></BaseInput>

      <template v-if="$v.event.title.$error">
        <p v-if="!$v.event.title.required" class="errorMessage">Title is required</p>
      </template>

      <BaseInput
          label="Description"
          v-model="event.description"
          type="text"
          :class="{ error: $v.event.description.$error }"
          @blur="$v.event.description.$touch()"
          placeholder="Add a description"></BaseInput>
      <template v-if="$v.event.description.$error">
        <p v-if="!$v.event.description.required" class="errorMessage">Description is required</p>
      </template>

      <h3>Where is your event?</h3>
      <BaseInput
          label="Location"
          v-model="event.location"
          type="text"
          :class="{ error: $v.event.location.$error }"
          @blur="$v.event.location.$touch()"
          placeholder="Add a location"></BaseInput>

      <template v-if="$v.event.location.$error">
        <p v-if="!$v.event.location.required" class="errorMessage">Location is required</p>
      </template>

      <h3>When is your event?</h3>

      <div class="field">
        <label>Date</label>
        <datepicker
            v-model="event.date"
            placeholder="Select a date"
            :input-class="{ error: $v.event.date.$error }"
            @opened="$v.event.date.$touch()"
        ></datepicker>

        <template v-if="$v.event.date.$error">
          <p v-if="!$v.event.date.required" class="errorMessage">Date is required</p>
        </template>
      </div>

      <BaseSelect
          label="Select a time"
          :items="times"
          v-model="event.time"
          :class="{ error: $v.event.time.$error }"
          @blur="$v.event.time.$touch()"
      />
      <template v-if="$v.event.time.$error">
        <p v-if="!$v.event.time.required" class="errorMessage">Time is required</p>
      </template>

      <BaseButton type="submit" btnClass="-fill-gradient" :disabled="$v.$anyError">Submit</BaseButton>
    </form>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import NProgress from 'nprogress';
import { required } from 'vuelidate/lib/validators';

Datepicker.methods.showCalendar = function() {
  if (this.disabled || this.isInline) {
    return false;
  }
  if (this.isOpen) {
    return this.close(true);
  } else if (!this.isInline) {
    this.$emit('opened');
  }
  this.setInitialView();
};

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
  validations: {
    event: {
      category: { required },
      title: { required },
      description: { required },
      location: { required },
      date: { required },
      time: { required }
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
      this.$v.$touch(); // Make sure every field is dirty.
      if ( ! this.$v.$invalid) {
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
}
</script>

<style scoped>
  .field {
    margin-bottom: 24px;
  }
</style>
