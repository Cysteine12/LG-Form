document.addEventListener('DOMContentLoaded', () => {
  const formData = new FormData()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const inputNames = [
      'name',
      'email',
      'dob',
      'sex',
      'marital_status',
      'school',
      'matric',
      'phone',
      'admission_year',
      'school_level',
      'lg_origin',
      'lg_resident',
      'v_skill',
    ]

    const formData = validateInputs(inputNames)
    if (!formData) return

    try {
      const response = await fetch('/submissions', {
        method: 'POST',
        body: formData,
      })

      const res = await response.json()
      if (!res?.success) throw new Error(res.message)

      document.getElementsByClassName('form-container')[0].style.display =
        'none'
      document.getElementsByClassName('alert-container')[0].style.display =
        'block'
    } catch (err) {
      document.getElementById('error').innerText = err.message
    } finally {
      window.scrollTo(0, 0)
    }
  }

  document.getElementById('formId')?.addEventListener('submit', handleSubmit)

  const validateInputs = (inputNames) => {
    let hasError
    inputNames.forEach((inputName) => {
      const inputValue = getInputValue(inputName)
      if (!inputValue) {
        window.scrollTo(0, 0)
        document.getElementById('error').innerText =
          `${inputName} is required`.toUpperCase()
        hasError = true
        return
      }
      formData.append(inputName, inputValue)
    })

    if (hasError) return

    return formData
  }

  const getInputValue = (inputName) => {
    return document.getElementsByName(inputName)[0]?.value
  }

  const handleFileChange = (e) => {
    formData.append(e.target.name, e.target.files[0])
  }

  document.querySelectorAll('input[type="file"]').forEach((input) => {
    input.addEventListener('change', handleFileChange)
  })
})
