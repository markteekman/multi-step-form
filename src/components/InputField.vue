<script setup>
import { computed } from 'vue'

const props = defineProps({
  autoComplete: {
    type: String,
    required: false,
    default: 'off',
  },
  id: {
    type: String,
    required: true,
    default: 'name',
  },
  isInvalid: {
    type: Boolean,
    required: false,
    default: false,
  },
  errorMessage: {
    type: String,
    required: false,
    default: 'This field is required',
  },
  label: {
    type: String,
    required: true,
    default: 'Name',
  },
  modelValue: {
    type: String,
    required: true,
    default: '',
  },
  placeholder: {
    type: String,
    required: false,
    default: '',
  },
  required: {
    type: Boolean,
    required: false,
    default: true,
  },
  type: {
    type: String,
    required: false,
    default: 'text',
    validator: (value) => {
      return ['text', 'email', 'tel'].includes(value)
    },
  },
})

const emit = defineEmits(['update:modelValue'])

const inputValue = computed({
  get: () => props.modelValue,
  set: (newValue) => emit('update:modelValue', newValue),
})
</script>

<template>
  <div class="input-field">
    <label :for="id">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :autocomplete="autoComplete"
      :aria-required="required"
      :aria-invalid="isInvalid.toString()"
      :value="inputValue"
      v-bind="isInvalid ? { 'aria-describedby': `input-field__error-${id}` } : {}"
      @input="inputValue = $event.target.value"
    />
    <span
      v-if="isInvalid"
      :id="`input-field__error-${id}`"
      class="input-field__error"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        fill="none"
      >
        <path
          fill="var(--error-color-dark)"
          d="M6 0C2.657 0 0 2.657 0 6s2.657 6 6 6 6-2.657 6-6-2.657-6-6-6Zm2.314 9L6 6.686 3.686 9 3 8.314 5.314 6 3 3.686 3.686 3 6 5.314 8.314 3 9 3.686 6.686 6 9 8.314 8.314 9Z"
        />
      </svg>
      {{ errorMessage }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/base/breakpoint' as *;

.input-field {
  display: flex;
  flex-direction: column;
  gap: var(--space-2xs);

  &:has([aria-invalid='true']) label {
    color: var(--error-color-dark);
  }

  @include breakpoint(medium) {
    gap: 0;
  }
}

label {
  color: var(--neutral-dark-blue);
  font-size: var(--font-size--1);
  font-weight: 500;
}

input {
  inline-size: 100%;
  padding: var(--space-xs) var(--space-s);
  border: 1px solid var(--neutral-cool-gray);
  border-radius: var(--radius-s);
  background-color: var(--neutral-white);

  &::placeholder {
    font-weight: bold;
  }

  &[aria-invalid='true'] {
    border-color: var(--error-color-dark);
  }
}

span {
  display: flex;
  align-items: center;
  gap: var(--space-3xs);
  margin-block-start: calc(var(--space-3xs) * -1);
  color: var(--error-color-dark);
  font-size: var(--font-size--3);
  line-height: var(--font-size-0);

  @include breakpoint(medium) {
    margin-block-start: var(--space-3xs);
  }

  svg {
    flex-shrink: 0;
  }
}
</style>
