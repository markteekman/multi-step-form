<script setup>
import { onMounted, ref } from 'vue'
import { useFormStore } from '../stores/form'

const store = useFormStore()
const isPressed = ref(false)
const currentValue = ref('Monthly')

const toggleIsPressed = () => {
  isPressed.value = !isPressed.value
  isPressed.value ? (currentValue.value = 'Yearly') : (currentValue.value = 'Monthly')
  store.toggleBillingCycle()
}

onMounted(() => {
  isPressed.value = store.billingCycle === 'yearly'
  isPressed.value ? (currentValue.value = 'Yearly') : (currentValue.value = 'Monthly')
})
</script>

<template>
  <div class="toggle-button">
    <span
      :class="{ selected: !isPressed }"
      aria-hidden="true"
    >
      Monthly
    </span>
    <button
      :aria-pressed="String(isPressed)"
      @click="toggleIsPressed"
    >
      <span class="sr-only">Pricing {{ currentValue }}</span>
    </button>
    <span
      :class="{ selected: isPressed }"
      aria-hidden="true"
    >
      Yearly
    </span>
  </div>
</template>

<style lang="scss" scoped>
.toggle-button {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--space-m);
  margin-block-start: var(--space-m);
  padding: var(--space-xs);
  background-color: var(--neutral-magnolia);
  border-radius: var(--radius-m);
  font-weight: bold;

  span {
    color: var(--neutral-text-gray);

    &.selected {
      color: var(--primary-purplish-blue);
    }
  }
}

button {
  --button-size: 60px;
  --indicator-size: 20px;
  --indicator-offset: 3px;

  position: relative;
  inline-size: var(--button-size);
  background-color: var(--primary-marine-blue);
  border-radius: 3rem;

  &::before {
    position: absolute;
    content: '';
    display: block;
    inset-inline-start: var(--indicator-offset);
    inline-size: var(--indicator-size);
    block-size: var(--indicator-size);
    background-color: var(--neutral-white);
    border-radius: 50%;
    transform: translateY(-50%);
    transition: all var(--animation-speed-medium) var(--cubic-bezier);
  }

  &[aria-pressed='true'] {
    &::before {
      inset-inline-start: calc(100% - var(--indicator-offset) - var(--indicator-size));
    }
  }
}
</style>
