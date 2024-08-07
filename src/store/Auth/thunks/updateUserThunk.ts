import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../../../utils/graphqlClientConfig';
import { EDIT_USER } from '../../../graphql/user/editUser';

export const updateUserData = createAsyncThunk(
  'auth/updateUserData',
  async (
    { userId, firstName, lastName }: { userId: string; firstName: string; lastName: string },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await client.mutate({
        mutation: EDIT_USER,
        variables: {
          editUserId: userId,
          userEditInput: {
            firstName,
            lastName,
          },
        },
      });
      return data.editUser;
    } catch (error) {
      return rejectWithValue(error as unknown as string);
    }
  },
);
