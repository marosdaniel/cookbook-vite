import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../../../utils/graphqlClientConfig';
import { EDIT_USER } from '../../../graphql/user/editUser';
import { AsyncThunkConfig, RootState } from '../../store';
import { TUser } from '../types';

export const updateUserThunk = createAsyncThunk<
  TUser, // Return type
  Partial<TUser>, // Argument type
  AsyncThunkConfig
>('updateUserThunk', async (userChanges, { getState, rejectWithValue }) => {
  const state = getState() as RootState;
  const existingUser: TUser = state.auth.user;

  if (!existingUser) {
    return rejectWithValue('User not found');
  }

  try {
    const { data } = await client.mutate({
      mutation: EDIT_USER,
      variables: {
        editUserId: existingUser._id,
        userEditInput: {
          firstName: userChanges.firstName,
          lastName: userChanges.lastName,
          locale: userChanges.locale,
        },
      },
    });
    return data.editUser;
  } catch (error) {
    return rejectWithValue(error as string);
  }
});
