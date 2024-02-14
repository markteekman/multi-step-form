<script setup>
import { useStepsStore } from '../stores/steps'

const store = useStepsStore()

const steps = [
  { id: 1, name: 'Your info' },
  { id: 2, name: 'Select plan' },
  { id: 3, name: 'Add-ons' },
  { id: 4, name: 'Summary' },
]

// Set the total number of steps in the store
store.$patch({ totalSteps: steps.length })
</script>

<template>
  <div class="step-tracker">
    <ol>
      <li
        v-for="step in steps"
        :key="step.id"
        :class="{ current: step.id === store.currentStep }"
      >
        <div>
          <span>Step {{ step.id }}</span>
          <span class="font-bold">{{ step.name }}</span>
        </div>
      </li>
    </ol>
  </div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/base/breakpoint' as *;

.step-tracker {
  padding: var(--space-l) var(--space-s);
  color: var(--neutral-white);
  background-color: var(--primary-purplish-blue);
  background-image: url('multi-step-form/bg-sidebar-desktop.svg');
  background-size: cover;
  border-radius: var(--radius-m);

  @include breakpoint(medium) {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    position: absolute;
    inset-block-start: 0;
    inset-inline: 0;
    block-size: var(--step-tracker-offset);
    background-image: url('multi-step-form/bg-sidebar-mobile.svg');
    border-radius: 0;
    z-index: -1;
  }
}

ol {
  display: flex;
  flex-direction: column;
  gap: var(--space-m);

  @include breakpoint(medium) {
    flex-direction: row;
    gap: var(--space-2xs);
  }
}

li {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  text-transform: uppercase;
  counter-increment: step;

  &::before {
    content: counter(step);
    display: grid;
    place-items: center;
    inline-size: 35px;
    block-size: 35px;
    font-size: var(--font-size--2);
    font-weight: bold;
    border: 1px solid var(--neutral-white);
    border-radius: 50%;
  }

  &.current {
    &::before {
      color: var(--primary-purplish-blue);
      background-color: var(--primary-pastel-blue);
      border-color: var(--primary-pastel-blue);
    }
  }

  div {
    display: flex;
    flex-direction: column;
    gap: var(--space-3xs);

    @include breakpoint(medium) {
      span {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
      }
    }
  }

  span:first-of-type {
    color: var(--primary-pastel-blue);
    font-size: var(--font-size--2);
    line-height: var(--font-size--1);
  }

  span:last-of-type {
    font-size: var(--font-size--1);
    line-height: var(--font-size-0);
  }
}
</style>
