<template>
  <div class="field"
    :class="{ dirty: meta.dirty, valid: meta.touched && meta.valid, invalid: meta.touched && !meta.valid }">
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
  syncVModel: true
})
defineOptions({ inheritAttrs: false })
</script>

<style lang="css">
.field {
  position: relative;
}

.field__label {
  position: relative;
  display: block;
}

.field__label-text {
  position: absolute;
  left: var(--space-sm);
  top: 50%;
  transform: translateY(-50%);
  transition: 0.2s ease;
  background: var(--form-element-bg);
}

.field__control {
  padding: var(--space-sm) var(--space-sm) var(--space-xxs);
  border-radius: var(--space-xs);
  border-width: 1px;
  background: var(--form-element-bg);
  width: 100%;
  /* transition: border-color 0.2s ease, color 0.2s ease; */
}

.field__control:focus {
  outline: none;
  border-color: var(--form-element-border-focus);
}

.field:focus-within .field__label-text,
.field:has(.field__control:not(:placeholder-shown)) .field__label-text {
  top: 0;
  color: var(--form-element-border-focus);
}

.field.invalid .field__label-text,
.field.invalid:focus-within .field__label-text,
.field.invalid:has(.field__control:not(:placeholder-shown)) .field__label-text {
  color: var(--color-error);
}

.field.invalid .field__control,
.field.invalid .field__control:focus {
  border-color: var(--color-error);
  color: var(--color-error);
}

.field__errors {
  list-style: disc;
  list-style-position: inside;
  line-height: var(--line-height-tight);
}

.field__error {
  color: var(--color-error);
}

.field__error::first-letter {
  text-transform: uppercase;
}
</style>
