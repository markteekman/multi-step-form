import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStepsStore = defineStore('steps', () => {
  const currentStep = ref(1)
  const totalSteps = ref(0)

  return { currentStep, totalSteps }
})
