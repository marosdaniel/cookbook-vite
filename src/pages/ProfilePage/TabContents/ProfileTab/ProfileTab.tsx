import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import { useAuthState } from '../../../../store/Auth';
import { TUser } from '../../../../store/Auth/types';

import { EDIT_USER } from '../../../../graphql/user/editUser';
import { GET_USER_BY_ID } from '../../../../graphql/user/getUser';

const ProfileTab = () => {
  const { user } = useAuthState();
  const [editUser] = useMutation(EDIT_USER);

  const { data, loading, error } = useQuery<{ getUserById: TUser }>(GET_USER_BY_ID, {
    variables: { getUserByIdId: user?._id ?? '' },
  });

  const userData: TUser | undefined = data?.getUserById;
  const { userName, email, firstName, lastName } = userData || {};

  const [localFirstName, setLocalFirstName] = useState(firstName);
  const [localLastName, setLocalLastName] = useState(lastName);

  const noChangesOnNames = localFirstName === firstName && localLastName === lastName;

  const handleSavePersonalData = async () => {
    try {
      await editUser({
        variables: {
          editUserId: user?._id ?? '',
          userEditInput: {
            firstName: localFirstName,
            lastName: localLastName,
          },
        },
      });
    } catch (_error) {
      console.error('Something went wrong:', _error);
    }
  };

  return (
    <section id="profile-tab">
      {/* <Box sx={sectionStyles}>
        <Typography variant="h5">General information</Typography>
        <Typography marginTop={1} variant="body2" sx={labelStyles} color="GrayText">
          User name
        </Typography>
        <Typography variant="body1">{userName}</Typography>
        <Typography variant="body2" sx={labelStyles} color="GrayText">
          E-mail
        </Typography>
        <Typography variant="body1">{email}</Typography>
      </Box>

      <PersonalData
        localFirstName={localFirstName ?? firstName}
        localLastName={localLastName ?? lastName}
        onSavePersonalData={handleSavePersonalData}
        setLocalFirstName={setLocalFirstName}
        setLocalLastName={setLocalLastName}
        loading={editUserLoading}
        error={editUserError}
        disabledSaving={noChangesOnNames}
      />
      <Password userId={user?._id ?? ''} /> */}
    </section>
  );
};

export default ProfileTab;
