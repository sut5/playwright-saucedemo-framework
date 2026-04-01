export const CHECKOUT_DATA = {
  validCustomer: {
    firstName: 'Suten',
    lastName: 'Tester',
    postalCode: '1000',
  },
  missingFirstName: {
    firstName: '',
    lastName: 'Tester',
    postalCode: '1000',
  },
  missingLastName: {
    firstName: 'Suten',
    lastName: '',
    postalCode: '1000',
  },
  missingPostalCode: {
    firstName: 'Suten',
    lastName: 'Tester',
    postalCode: '',
  },
} as const;

export const CHECKOUT_ERRORS = {
  firstNameRequired: /first name is required/i,
  lastNameRequired: /last name is required/i,
  postalCodeRequired: /postal code is required/i,
} as const;
