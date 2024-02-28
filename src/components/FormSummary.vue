<script setup>
import { computed } from 'vue'
import { useFormStore } from '../stores/form'

const store = useFormStore()

function formatAddonPrice(addonKey) {
  const price =
    store.billingCycle === 'monthly'
      ? store.addonDetails[addonKey].monthlyPrice
      : store.addonDetails[addonKey].yearlyPrice
  return store.billingCycle === 'monthly' ? `$${price}/mo` : `$${price}/yr`
}

const billingCyclePrice = computed(() => {
  const selectedPlanDetails = store.planDetails[store.formData.plan]
  const price = store.billingCycle === 'monthly' ? selectedPlanDetails.monthlyPrice : selectedPlanDetails.yearlyPrice
  return `$${price}/${store.billingCycle === 'monthly' ? 'mo' : 'yr'}`
})

const billingCycleTotal = computed(() => {
  return store.billingCycle === 'monthly' ? 'month' : 'year'
})

const totalPrice = computed(() => {
  if (store.billingCycle === 'monthly') {
    return `$${store.totalPrice}/mo`
  } else {
    return `$${store.totalPrice}/yr`
  }
})
</script>

<template>
  <div class="form-summary">
    <div class="form-summary__receipt">
      <div class="form-summary__plan">
        <p>
          {{ store.planDetails[store.formData.plan].title }}
          <button @click="store.$patch({ currentStep: 2 })">Change your plan</button>
        </p>
        <p>{{ billingCyclePrice }}</p>
      </div>
      <div class="form-summary__addons">
        <div
          class="form-summary__addon"
          v-for="addonKey in store.sortedAddons"
          :key="addonKey"
        >
          <p>{{ store.addonDetails[addonKey].title }}</p>
          <p>{{ formatAddonPrice(addonKey) }}</p>
        </div>
      </div>
    </div>
    <div class="form-summary__total">
      <p>Total (per {{ billingCycleTotal }})</p>
      <p>{{ totalPrice }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.form-summary {
  display: flex;
  flex-direction: column;
  gap: var(--space-m);

  &__plan,
  &__addon,
  &__total {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__addons,
  &__total {
    color: var(--neutral-text-gray);

    p:last-of-type {
      font-weight: bold;
    }
  }

  &__receipt {
    display: flex;
    flex-direction: column;
    gap: var(--space-s);
    padding: var(--space-m) var(--space-l);
    background-color: var(--neutral-magnolia);
    border-radius: var(--radius-m);
  }

  &__plan {
    > p {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: var(--space-3xs);
    }

    p {
      font-weight: bold;
    }

    button {
      padding: 0;
      color: var(--neutral-text-gray);
      font-weight: normal;
      border: none;
      text-decoration: underline;

      &:hover,
      &:focus-visible {
        text-decoration: none;
      }
    }
  }

  &__addons {
    padding-block-start: var(--space-s);
    border-top: 1px solid var(--neutral-light-gray);
  }

  &__addon:not(:last-child) {
    margin-block-end: var(--space-s);
  }

  &__total {
    padding-inline: var(--space-l);

    p:last-of-type {
      color: var(--primary-purplish-blue);
      font-size: var(--font-size-1);
    }
  }
}
</style>
