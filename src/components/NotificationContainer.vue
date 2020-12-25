<template>
  <div class="notification-container">
    <NotificationBar
        v-for="notification in notifications"
        :notification="notification"
        :key="notification.id"
    />
  </div>
</template>

<script>
import NotificationBar from "@/components/NotificationBar";
import { mapState } from 'vuex'

export default {
  name: "NotificationContainer",
  components: {
    NotificationBar
  },
  computed: mapState('notification', ['notifications'])
  /* when notification is removed v-for doesn't updated.
  data() {
    return {
      notifications: this.$store.state.notification.notifications
    }
  }
  */
}
</script>

<style scoped>
  .notification-container {
    position: fixed;
    bottom: 0;
    right: 0;
    padding-right: 40px;
  }
</style>
