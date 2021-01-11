<template>
  <div class="field">
    <label v-if="label">{{ label }}</label>
    <select :value="value" @change="updateValue" v-bind="$attrs" v-on="$listeners">
      <option v-for="item in items"
              :value="item"
              :key="item"
              :selected="value === item">{{ item }}</option>
    </select>
  </div>
</template>

<script>
import { BaseInputMixin } from "@/mixins/BaseInputMixin";
export default {
  name: "BaseSelect",
  mixins: [BaseInputMixin],
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>
