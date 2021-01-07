<template>
  <div>
    <h1>Uh-Oh!</h1>
    <h3>Looks like you are experiencing network issues. Please click the back button and try again.</h3>
    <router-link :to="{ name: 'events.index' }">Or go back to the home page</router-link>
  </div>
</template>

<script>
  export default {
    name: "NetworkIssue"
  }
</script>
