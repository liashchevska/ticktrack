<template>
  <div class="field">
    <label class="field__label">
      <span class="field__label-text">
        <slot name="label">{{ props.name }}</slot>
      </span>
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

<style lang="css">
.field {
  position: relative;
}

.field__label {
  position: relative;
  display: flex;
  flex-direction: column;
  /* display: block; */
}

.field__control {
  width: 100%;
  min-height: 2.5rem;
  outline: none;
  background: transparent;
  border-radius: var(--radius-xs);
  border: 1px solid var(--color-accent);
  padding: var(--space-xs)
}

textarea.field__control {
  min-height: 4rem;
  resize: vertical;
}

.field__label-text {
  position: absolute;
  left: var(--space-sm);
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  transition: 0.2s ease;
  color: var(--color-accent);
}

.field__label:has(.field__control:focus) .field__label-text,
.field__label:has(.field__control:not(:placeholder-shown)) .field__label-text {
  top: 0;
}

.field,
.field__label,
.field__label-text {
  background: inherit;
}

/* .field__error {} */
</style>
