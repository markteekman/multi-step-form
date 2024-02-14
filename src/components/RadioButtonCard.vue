<script setup>
const props = defineProps({
  bonus: {
    type: String,
    required: true,
    default: '2 months free',
  },
  checked: {
    type: Boolean,
    required: false,
    default: false,
  },
  description: {
    type: String,
    required: true,
    default: 'Advanced for $12 a month',
  },
  icon: {
    type: String,
    required: true,
    default: 'advanced',
  },
  id: {
    type: String,
    required: true,
    default: 'advanced',
  },
  name: {
    type: String,
    required: true,
    default: 'plan',
  },
  price: {
    type: String,
    required: true,
    default: '$9/mo',
  },
  showBonus: {
    type: Boolean,
    required: true,
    default: false,
  },
  title: {
    type: String,
    required: true,
    default: 'Advanced',
  },
  value: {
    type: String,
    required: true,
    default: 'advanced',
  },
})
</script>

<template>
  <label
    class="radio-card"
    :for="id"
  >
    <input
      type="radio"
      :id="id"
      :value="value"
      :name="name"
      :checked="checked"
    />
    <span class="sr-only">{{ description }}</span>
    <span class="radio-card__details">
      <img
        :src="`/multi-step-form/icon-${icon}.svg`"
        alt=""
      />
      <span class="radio-card__content">
        <span class="content__title">{{ title }}</span>
        <span class="content__price">{{ price }}</span>
        <span
          class="content__bonus"
          v-if="showBonus"
          >{{ bonus }}</span
        >
      </span>
    </span>
  </label>
</template>

<style lang="scss" scoped>
@use '../assets/scss/base/breakpoint' as *;

.radio-card {
  position: relative;
  display: block;
  flex: 1 1 0;
  inline-size: 0;
  block-size: 160px;
  padding: var(--space-s);
  border: 2px solid var(--neutral-cool-gray);
  border-radius: var(--radius-m);
  transition: all var(--animation-speed-slow) var(--cubic-bezier);
  cursor: pointer;

  @include breakpoint(medium) {
    inline-size: 100%;
  }

  &__details {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    block-size: 100%;

    @include breakpoint(medium) {
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      gap: var(--space-s);
    }
  }

  &__content {
    span {
      display: block;
    }
  }
}

.content {
  &__title,
  &__bonus {
    color: var(--primary-marine-blue);
  }

  &__title {
    font-weight: bold;
  }

  &__price {
    color: var(--neutral-text-gray);
  }
}

input {
  position: absolute;
  inset-block-start: var(--space-2xs);
  inset-inline-end: var(--space-2xs);
  accent-color: var(--primary-purplish-blue);
}

label:has(input:checked) {
  background-color: var(--neutral-magnolia);
  border-color: var(--primary-purplish-blue);
}
</style>
