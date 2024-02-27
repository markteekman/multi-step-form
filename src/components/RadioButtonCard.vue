<script setup>
import { computed } from 'vue'
import { useFormStore } from '../stores/form'
const store = useFormStore()

const props = defineProps({
  icon: {
    type: String,
    required: true,
    default: 'arcade',
  },
  id: {
    type: String,
    required: true,
    default: 'arcade',
  },
  monthlyPrice: {
    type: String,
    required: true,
    default: '$9/mo',
  },
  name: {
    type: String,
    required: true,
    default: 'plan',
  },
  title: {
    type: String,
    required: true,
    default: 'Arcade',
  },
  value: {
    type: String,
    required: true,
    default: 'arcade',
  },
  yearlyPrice: {
    type: String,
    required: true,
    default: '$90/yr',
  },
})

const emit = defineEmits(['update:modelValue'])

function updateValue(event) {
  store.updateFormData({ plan: event.target.value })
}

const currentPrice = computed(() => {
  return store.billingCycle === 'monthly' ? props.monthlyPrice : props.yearlyPrice
})

const dynamicDescription = computed(() => {
  if (store.billingCycle === 'monthly') {
    return `${props.title} for ${props.monthlyPrice}`
  } else {
    return `${props.title} for ${props.yearlyPrice}, with 2 months free`
  }
})

const showBonus = computed(() => {
  return store.billingCycle === 'yearly'
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
      :value="id"
      :name="name"
      :checked="store.formData.plan === value"
      @change="updateValue"
    />
    <span class="sr-only">{{ dynamicDescription }}</span>
    <span
      class="radio-card__details"
      aria-hidden="true"
    >
      <img
        :src="`/multi-step-form/icon-${id}.svg`"
        alt=""
      />
      <span class="radio-card__content">
        <span class="content__title">{{ title }}</span>
        <span class="content__price">{{ currentPrice }}</span>
        <span
          class="content__bonus"
          v-if="showBonus"
        >
          2 months free
        </span>
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
  block-size: 185px;
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
    font-weight: bold;
  }

  &__title {
    color: var(--primary-marine-blue);
  }

  &__price {
    color: var(--neutral-text-gray);
  }

  &__bonus {
    margin-block-start: var(--space-3xs);
    color: var(--primary-purplish-blue);
    font-size: var(--font-size--2);
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
