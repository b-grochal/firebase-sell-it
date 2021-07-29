const isEmail = (email) => {
  const regEx =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;
  else return false;
};

const isEmpty = (string) => {
  if (string.trim() === "") return true;
  else return false;
};

exports.validateSignUpData = (data) => {
  let errors = {};

  if (isEmpty(data.firstName)) {
    errors.firstName = "First name can't be empty.";
  }

  if (isEmpty(data.familyName)) {
    errors.firstName = "Family name can't be empty.";
  }

  if (isEmpty(data.phoneNumber)) {
    errors.firstName = "Phone number can't be empty.";
  }

  if (isEmpty(data.email)) {
    errors.email = "Email can't be empty";
  } else if (!isEmail(data.email)) {
    errors.email = "Email must be a valid email address";
  }

  if (isEmpty(data.password)) {
    errors.password = "Password can't be empty";
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Passwords must match";
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

exports.validateSignInData = (data) => {
  let errors = {};

  if (isEmpty(data.email)) {
    errors.email = "Email can't be empty";
  } else if (!isEmail(data.email)) {
    errors.email = "Email must be a valid email address";
  }

  if (isEmpty(data.password)) {
    errors.password = "Password can't be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};
