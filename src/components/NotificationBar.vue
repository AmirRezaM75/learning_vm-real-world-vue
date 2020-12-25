<template>
  <div class="notification-bar" :class="notificationType">
    <p>{{ notification.message }}</p>
  </div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  name: "NotificationBar",
  data() {
    return {
      timeout: null
    }
  },
  mounted() {
    this.timeout = setTimeout(() => this.remove(this.notification), 5000)
  },
  beforeDestroy() {
    clearTimeout(this.timeout) // Memory leaks
  },
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  computed: {
    notificationType() {
      return `has-${this.notification.type}`
    }
  },
  methods: mapActions('notification', ['remove'])
}
</script>

<style scoped>
.notification-bar {
  margin: 1em 0 1em;
  padding: 5px 20px;
  border-radius: 7px;
}

.notification-bar.has-error {
  background-color: #ffd6d6;
  color: brown;
}

.notification-bar.has-success {
  background-color: #e3ffcd;
  color: #225800;
}
</style>
