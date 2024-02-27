<script setup>
import { computed } from 'vue'
import { useFormStore } from '../stores/form'

const store = useFormStore()

const props = defineProps({
  id: {
    type: String,
    required: true,
    default: 'online',
  },
  name: {
    type: String,
    required: true,
    default: 'addon',
  },
  monthlyPrice: {
    type: String,
    required: true,
    default: '+$1/mo',
  },
  title: {
    type: String,
    required: true,
    default: 'Online srevice',
  },
  summary: {
    type: String,
    required: true,
    default: 'Access to mutliplayer games',
  },
  value: {
    type: String,
    required: true,
    default: 'online',
  },
  yearlyPrice: {
    type: String,
    required: true,
    default: '+$10/yr',
  },
})

const isChecked = computed({
  get: () => store.formData.addons.includes(props.value),
  set: (newValue) => {
    const currentIndex = store.formData.addons.indexOf(props.value)
    if (newValue && currentIndex === -1) {
      store.formData.addons = [...store.formData.addons, props.value]
    } else if (!newValue && currentIndex !== -1) {
      store.formData.addons = store.formData.addons.filter((addon) => addon !== props.value)
    }
  },
})

const currentPrice = computed(() => {
  return store.billingCycle === 'monthly' ? props.monthlyPrice : props.yearlyPrice
})

const dynamicDescription = computed(() => {
  if (store.billingCycle === 'monthly') {
    return `${props.title} - ${props.summary} for ${props.monthlyPrice}`
  } else {
    return `${props.title} - ${props.summary} for ${props.yearlyPrice}`
  }
})
</script>

<template>
  <label
    class="checkbox-card"
    :for="id"
  >
    <span class="sr-only">{{ dynamicDescription }}</span>
    <span
      class="checkbox-card__content"
      aria-hidden="true"
    >
      <input
        type="checkbox"
        :id="id"
        :name="name"
        v-model="isChecked"
      />
      <div class="checkbox-card__details">
        <span>{{ title }}</span>
        <span>{{ summary }}</span>
      </div>
    </span>
    <div class="checkbox-card__price">
      <span>{{ currentPrice }}</span>
    </div>
  </label>
</template>

<style lang="scss" scoped>
.checkbox-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  block-size: 80px;
  padding: var(--space-s);
  border: 2px solid var(--neutral-cool-gray);
  border-radius: var(--radius-m);
  transition: all var(--animation-speed-slow) var(--cubic-bezier);
  cursor: pointer;

  &__content {
    display: flex;
    align-items: center;
    gap: var(--space-s);

    span {
      display: block;

      &:first-of-type {
        color: var(--primary-marine-blue);
        font-weight: bold;
      }

      &:last-of-type {
        color: var(--neutral-text-gray);
        font-size: var(--font-size--1);
      }
    }
  }

  &__price {
    justify-self: flex-end;
    color: var(--primary-purplish-blue);
    font-size: var(--font-size--1);
  }
}

input {
  inline-size: 20px;
  block-size: 20px;
  accent-color: var(--primary-purplish-blue);
  transition: all var(--animation-speed-slow) var(--cubic-bezier);
}

label:has(input:checked) {
  background-color: var(--neutral-magnolia);
  border-color: var(--primary-purplish-blue);
}
</style>
