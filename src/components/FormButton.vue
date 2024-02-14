<script setup>
const props = defineProps({
  type: {
    type: String,
    required: true,
    default: 'button',
    validator: (value) => {
      return ['button', 'submit'].includes(value)
    },
  },
  variant: {
    type: String,
    required: false,
    default: 'primary',
    validator: (value) => {
      return ['primary', 'secondary'].includes(value)
    },
  },
})
</script>

<template>
  <button
    :class="variant"
    :type="type"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped>
button {
  --rotate: 3deg;
  --translate: 5px;

  padding: var(--space-s) var(--space-m);
  font-weight: bold;
  border-color: var(--primary-marine-blue);
  border-radius: var(--radius-m);
  border-width: 2px;
  text-decoration: underline;
  text-underline-offset: 8px;
  text-decoration-color: transparent;
  transition: all var(--animation-speed-fast) var(--cubic-bezier);

  &:is(:hover, :focus-visible) {
    text-underline-offset: 2px;
    text-decoration-color: currentColor;
  }

  &.primary {
    color: var(--neutral-white);
    background-color: var(--primary-marine-blue);

    &:is(:hover, :focus-visible) {
      rotate: var(--rotate);
      translate: var(--translate);
    }
  }

  &.secondary {
    color: var(--primary-marine-blue);
    background-color: var(--neutral-white);

    &:is(:hover, :focus-visible) {
      rotate: calc(var(--rotate) * -1);
      translate: calc(var(--translate) * -1);
    }
  }
}
</style>
