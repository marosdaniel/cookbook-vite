import gql from 'graphql-tag';
const EDIT_USER = gql`
  mutation EditUser($editUserId: ID!, $userEditInput: UserEditInput!) {
    editUser(id: $editUserId, userEditInput: $userEditInput) {
      _id
      firstName
      lastName
      email
      locale
      userName
      role
    }
  }
`;

const CHANGE_PASSWORD = gql`
  mutation ChangePassword($userId: ID!, $passwordEditInput: PasswordEditInput!) {
    changePassword(id: $userId, passwordEditInput: $passwordEditInput)
  }
`;

const RESET_PASSWORD = gql`
  mutation Mutation($email: String!) {
    resetPassword(email: $email) {
      success
      message
    }
  }
`;

const SET_NEW_PASSWORD = gql`
  mutation Mutation($newPassword: String!, $token: String!) {
    setNewPassword(newPassword: $newPassword, token: $token) {
      success
      message
    }
  }
`;

export { EDIT_USER, CHANGE_PASSWORD, RESET_PASSWORD, SET_NEW_PASSWORD };
