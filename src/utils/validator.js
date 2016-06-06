// Referenced https://github.com/erikras/react-redux-universal-hot-example/blob/master/src/utils/validation.js
const isEmpty = value => value === undefined || value === null || value === '';

export const renderError = (field) => { 
    if (field.touched && field.error) {
        return field.error    
    }
}

export function validateEmail(value) {
  if (!isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return 'Invalid email address';
  }
}

export function validateMinLength(min) {
  return value => {
    if (!isEmpty(value) && value.length < min) {
      return `Must be at least ${min} characters`;
    }
  };
}

export function validateMaxLength(max) {
  return value => {
    if (!isEmpty(value) && value.length > max) {
      return `Must be no more than ${max} characters`;
    }
  };
}


