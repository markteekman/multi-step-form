<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  lastStep: {
    type: Boolean,
    required: false,
    default: false,
  },
})
</script>

<template>
  <div :class="{ 'form-step': true, last: lastStep }">
    <template v-if="!lastStep">
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
      <slot />
    </template>
    <div v-else>
      <img
        :src="`/multi-step-form/icon-thank-you.svg`"
        alt=""
      />
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/base/breakpoint' as *;

.form-step {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  p {
    margin-block-end: var(--space-l);
    color: var(--neutral-text-gray);

    @include breakpoint(medium) {
      margin-block-start: var(--space-2xs);
      margin-block-end: var(--space-s);
      font-size: var(--font-size-1);
      line-height: var(--font-size-3);
    }
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-s);

    p {
      text-align: center;
    }
  }
}
</style>
