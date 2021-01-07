<template>
  <div class="field">
    <label v-if="label">{{ label }}</label>
    <input :value="value" @input="updateValue" v-bind="$attrs"/>
    <!--Need to send the input value up to parent -->
  </div>
</template>

<script>
export default {
  name: "BaseInput",
  inheritAttrs: false, // Attributes inherited at root element by default
  props: {
    label: {
      type: String,
      default: ''
    },
    value: [String, Number]
  },
  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value)
      // I can use @input on its parent component
    }
  }
}
</script>
