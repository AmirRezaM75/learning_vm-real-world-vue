<template>
  <div class="field">
    <label v-if="label">{{ label }}</label>
    <input :value="value" @input="updateValue" v-bind="$attrs" v-on="listeners"/>
    <!--Need to send the input value up to parent -->
  </div>
</template>

<script>
import { BaseInputMixin } from "@/mixins/BaseInputMixin";
export default {
  name: "BaseInput",
  mixins: [BaseInputMixin],
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue
      }
    }
  }
}
</script>
