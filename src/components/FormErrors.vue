<script setup>
const props = defineProps({
  errors: {
    type: Array,
    required: true,
    default: () => [],
  },
})
</script>

<template>
  <div
    class="error"
    role="alert"
  >
    <div class="error__icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xml:space="preserve"
        width="32"
        height="32"
        style="enable-background: new 0 0 32 32"
      >
        <path
          fill="var(--error-color-dark)"
          d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14 14-6.2 14-14S23.8 2 16 2zm0 26C9.4 28 4 22.6 4 16S9.4 4 16 4s12 5.4 12 12-5.4 12-12 12z"
        />
        <path
          fill="var(--error-color-dark)"
          d="M21.4 23 16 17.6 10.6 23 9 21.4l5.4-5.4L9 10.6 10.6 9l5.4 5.4L21.4 9l1.6 1.6-5.4 5.4 5.4 5.4z"
        />
      </svg>
    </div>
    <p>
      There are <strong>{{ errors.length }}</strong> errors in the form. Please fix them.
    </p>
    <ol class="error__list">
      <li
        v-for="error in errors"
        :key="error"
      >
        <a href="#">
          {{ error }}
        </a>
      </li>
    </ol>
  </div>
</template>

<style lang="scss" scoped>
.error {
  position: relative;
  margin-block-end: var(--space-m);
  padding: var(--space-m);
  background-color: var(--error-color-light);
  border-left: 3px solid var(--error-color-dark);
  border-radius: var(--radius-m) var(--radius-m) var(--radius-m) var(--radius-s);

  &__icon {
    position: absolute;
    border-radius: 50%;
    inset-block-start: 0;
    inset-inline-start: 0;
    transform: translate(calc(-50% - 1.5px), -50%);
    padding: var(--space-3xs);
    background-color: var(--neutral-white);
  }

  &__list {
    padding: var(--space-s) 0 0 var(--space-s);
    list-style: decimal;

    li:not(:last-child) {
      margin-bottom: var(--space-3xs);
    }
  }
}
</style>
