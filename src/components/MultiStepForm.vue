<script setup>
import StepTracker from './StepTracker.vue'
import FormSteps from './FormSteps.vue'
</script>

<template>
  <h1 class="sr-only">Multi Step Form build with Astro and Vue 3</h1>
  <section class="multi-step-form">
    <StepTracker />
    <FormSteps />
  </section>
</template>

<style lang="scss" scoped>
@use '../assets/scss/base/breakpoint' as *;

.multi-step-form {
  --step-tracker-offset: 175px;

  position: relative;
  display: grid;
  grid-template-columns: 275px 650px;
  inline-size: min(100%, 975px);
  min-block-size: 715px;
  margin: var(--space-s);
  padding: var(--space-s) 0 var(--space-s) var(--space-s);
  background-color: var(--neutral-white);
  border-radius: var(--radius-h);
  box-shadow: var(--elevation-3);

  @include breakpoint(medium) {
    inline-size: 100%;
    min-block-size: 75vh;
    display: block;
    margin: 0;
    padding: 0;
    background-color: transparent;
    border-radius: 0;
    box-shadow: none;
  }
}
</style>
