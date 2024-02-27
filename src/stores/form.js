import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useFormStore = defineStore('form', () => {
  const currentStep = ref(1)
  const totalSteps = ref(0)
  const billingCycle = ref('monthly')
  const formData = ref({
    name: '',
    email: '',
    phone: '',
    plan: 'arcade',
    addons: [],
  })
  const formErrors = ref({})
  const planDetails = {
    arcade: {
      title: 'Arcade',
      monthlyPrice: 9,
      yearlyPrice: 90,
    },
    advanced: {
      title: 'Advanced',
      monthlyPrice: 12,
      yearlyPrice: 120,
    },
    pro: {
      title: 'Pro',
      monthlyPrice: 15,
      yearlyPrice: 150,
    },
  }
  const addonDetails = {
    online: {
      title: 'Online service',
      monthlyPrice: 1,
      yearlyPrice: 10,
    },
    storage: {
      title: 'Larger storage',
      monthlyPrice: 2,
      yearlyPrice: 20,
    },
    profile: {
      title: 'Customizable profile',
      monthlyPrice: 2,
      yearlyPrice: 20,
    },
  }

  const toggleBillingCycle = () => {
    billingCycle.value = billingCycle.value === 'monthly' ? 'yearly' : 'monthly'
  }

  const updateFormData = (data) => {
    formData.value = { ...formData.value, ...data }
  }

  const setFormErrors = (errors) => {
    formErrors.value = errors
  }

  const sortedAddons = computed(() => {
    const allAddons = Object.keys(addonDetails)
    const userSelectedAddons = formData.value.addons
    return allAddons.filter((addon) => userSelectedAddons.includes(addon))
  })

  const totalPrice = computed(() => {
    const planPrice =
      billingCycle.value === 'monthly'
        ? planDetails[formData.value.plan].monthlyPrice
        : planDetails[formData.value.plan].yearlyPrice

    let total = planPrice

    formData.value.addons.forEach((addonKey) => {
      const addonPrice =
        billingCycle.value === 'monthly' ? addonDetails[addonKey].monthlyPrice : addonDetails[addonKey].yearlyPrice
      total += addonPrice
    })

    return total
  })

  const resetForm = () => {
    currentStep.value = 1
    billingCycle.value = 'monthly'
    formData.value = {
      name: '',
      email: '',
      phone: '',
      plan: 'arcade',
      addons: [],
    }
  }

  return {
    currentStep,
    totalSteps,
    billingCycle,
    formData,
    formErrors,
    planDetails,
    addonDetails,
    toggleBillingCycle,
    updateFormData,
    setFormErrors,
    sortedAddons,
    totalPrice,
    resetForm,
  }
})
