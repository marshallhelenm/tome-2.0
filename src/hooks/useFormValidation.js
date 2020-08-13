import { useState, useEffect } from 'react';

function useFormValidation(initialState, validate, firebaseCall) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        firebaseCall();
        setSubmitting(false);
      } else {
        setSubmitting(false);
      }
    }
  }, [errors, isSubmitting, firebaseCall]);

  function handleChange(event) {
    event.persist();
    setValues((previousValues) => ({
      ...previousValues,
      [event.target.name]: event.target.value,
    }));
  }

  function handleBlur() {
    const validationErrors = validate(values);
    setErrors(validationErrors);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setSubmitting(true);
  }

  function clearValues() {
    setValues(initialState);
  }

  function clearErrors() {
    setErrors({});
  }

  return {
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    values,
    clearValues,
    clearErrors,
  };
}

export default useFormValidation;
