export function validateLogin(values) {
    const errors = {};
  
    if (!values.email) {
      errors.email = 'Email Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid Email address';
    }
  
    if (!values.password) {
      errors.password = 'Password Required';
    } else if (values.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (values.password !== values.confirm){
        errors.confirm = 'Passwords did not match!';
    } 

    return errors;
  }