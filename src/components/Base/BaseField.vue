<template>
  <div class="field">
    <label class="field__label">
      <span class="field__label-text">
        <slot name="label">{{ props.name }}</slot>
      </span>
      <!-- Inject extra content into the field control, e.g., <option> into <select> -->
      <component :is="props.as" :value="value" @input="value = $event.target.value" v-bind="$attrs" placeholder=""
        class="field__control">
        <slot name="field-content"></slot>
      </component>
    </label>

    <ul v-if="errors.length" class="field__errors">
      <li v-for="(error, idx) in errors" :key="idx" class="field__error">{{ error }}</li>
    </ul>
  </div>
</template>

<script setup>
import { useField } from 'vee-validate';

const props = defineProps({
  name: { type: String, required: true },
  as: { type: String, default: 'input' },
})
const { value, errors } = useField(props.name, undefined, {
  syncVModel: true
})
defineOptions({ inheritAttrs: false })
</script>

<style lang="css"></style>
