import gql from 'graphql-tag';

const LOGIN_USER = gql`
  mutation Mutation($userLoginInput: UserLoginInput!) {
    loginUser(userLoginInput: $userLoginInput) {
      token
      user {
        userName
        _id
      }
      userId
    }
  }
`;

export { LOGIN_USER };
