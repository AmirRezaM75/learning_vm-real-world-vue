<template>
  <div>
    <h1>Oops!</h1>
    <h3>The {{ resource }} you are looking for is not here.</h3>
    <router-link :to="{ name: 'events.index' }">Back to the home page</router-link>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  props: ['resource']
}
</script>
