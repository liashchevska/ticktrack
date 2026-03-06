<template>
  <div class="field" :class="{ invalid: meta.touched && !meta.valid }">
    <label class="field__label">
      <span class="field__label-text">
        <slot>{{ props.name }}</slot>
      </span>

      <!-- Inject extra content into the field control, e.g., <option> into <select> -->
      <component :is="props.as" :value="value" @input="value = $event.target.value" v-bind="$attrs"
        class="field__control">
        <slot name="field-content"></slot>
      </component>
    </label>

    <ul v-if="errors.length" class="field__errors">
      <li v-for="(error, idx) in errors" :key="idx" class="field__error">
        <small> {{ error }} </small>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useField } from 'vee-validate';

const props = defineProps({
  name: { type: String, required: true },
  as: { type: String, default: 'input' },
})
const { value, errors, meta } = useField(props.name, undefined, {
  syncVModel: true,
  validateOnValueUpdate: false
})
defineOptions({ inheritAttrs: false })
</script>

<style lang="css">
.field__label {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.field__control {
  padding: var(--space-sm) var(--space-sm) var(--space-xxs);
  border-radius: var(--space-xs);
  border-width: 1px;
  width: 100%;
}

.field__control:focus {
  outline: none;
  border-color: var(--form-element-border-focus);
}

/* .field.invalid .field__control,
.field.invalid .field__control:focus {
  border-color: var(--color-error);
  color: var(--color-error);
} */

.field__errors {
  list-style: disc;
  list-style-position: inside;
  line-height: var(--line-height-tight);
}

.field__error {
  color: var(--color-error);
}

.field__error::first-letter,
.field__label-text::first-letter {
  text-transform: uppercase;
}
</style>
