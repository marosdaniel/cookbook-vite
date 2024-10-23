import { defineMessages } from 'react-intl';

export const responseMessages = defineMessages({
  success: {
    id: 'response.success',
    defaultMessage: 'Success',
  },
  error: {
    id: 'response.error',
    defaultMessage: 'Error',
  },
  resetPasswordFailed: {
    id: 'response.resetPasswordFailed',
    defaultMessage: 'Reset password failed',
  },
  emailWithResetLinkSent: {
    id: 'response.emailWithResetLinkSent',
    defaultMessage: 'An email with a link to reset your password has been sent to you.',
  },
  shouldBeValidEmail: {
    id: 'response.shouldBeValidEmail',
    defaultMessage: 'Should be a valid email',
  },
  ratingSuccess: {
    id: 'response.ratingSuccess',
    defaultMessage: 'Recipe rated successfully',
  },
  ratingFailed: {
    id: 'response.ratingFailed',
    defaultMessage: 'An error occurred while rating the recipe',
  },
});
