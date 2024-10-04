import { defineMessages } from 'react-intl';

export const responseMessages = defineMessages({
  resetPasswordFailed: {
    id: 'response.resetPasswordFailed',
    defaultMessage: 'Reset password failed',
  },
  emailWithResetLinkSent: {
    id: 'response.emailWithResetLinkSent',
    defaultMessage: 'An email with a reset link has been sent to your email address',
  },
  shouldBeValidEmail: {
    id: 'response.shouldBeValidEmail',
    defaultMessage: 'Should be a valid email',
  },
});
