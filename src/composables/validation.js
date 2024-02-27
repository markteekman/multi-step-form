import { ref } from 'vue'

const nameIsValid = ref(false)
const emailIsValid = ref(false)
const phoneIsValid = ref(false)
const nameErrorMessage = 'Please provide a name.'
const emailErrorMessage = 'Please provide an email address, for example stephenking@lorem.com.'
const phoneErrorMessage = 'Please provide a valid phone number.'

export function useValidation() {
  const errorMessages = ref([])

  const validateForm = (formData) => {
    const errors = []

    // Validate name
    if (!formData.name.trim()) {
      errors.push({ id: 'name', message: nameErrorMessage })
      nameIsValid.value = true
    } else {
      nameIsValid.value = false
    }

    // Validate email
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.push({ id: 'email', message: emailErrorMessage })
      emailIsValid.value = true
    } else {
      emailIsValid.value = false
    }

    // Validate phone
    if (!formData.phone.trim() || !/^\+?\d{1,4}([-.\s]?\d{1,3}){2,3}$/.test(formData.phone)) {
      errors.push({ id: 'phone', message: phoneErrorMessage })
      phoneIsValid.value = true
    } else {
      phoneIsValid.value = false
    }

    errorMessages.value = errors

    return errors
  }

  return {
    errorMessages,
    validateForm,
    nameIsValid,
    emailIsValid,
    phoneIsValid,
    nameErrorMessage,
    emailErrorMessage,
    phoneErrorMessage,
  }
}
