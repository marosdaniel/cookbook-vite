import { useQuery } from '@apollo/client';

import { TUser } from '../../../../store/Auth/types';
import { GET_ALL_USERS } from '../../../../graphql/user/getUser';

const UsersTab = () => {
  const { data, loading, error } = useQuery<{ getAllUser: TUser[] }>(GET_ALL_USERS);

  const users: TUser[] = data?.getAllUser ?? [];

  const handleDeleteUser = (userId: string) => {
    console.log('handleDeleteUser: ', userId);
  };

  return (
    // <List sx={{ maxWidth: '960px' }}>
    //   {users.map((user, index) => {
    //     const { _id: userId, userName, role } = user;
    //     return (
    //       <TransitionGroup key={index}>
    //         <Collapse>
    //           <ListItem
    //             sx={listItemStyles}
    //             secondaryAction={
    //               role !== ERole.ADMIN && (
    //                 <IconButton edge="end" aria-label="delete" title="Delete" onClick={() => handleDeleteUser(userId)}>
    //                   <DeleteIcon />
    //                 </IconButton>
    //               )
    //             }
    //           >
    //             <Typography variant="h6" color="text.secondary">
    //               {userName}
    //             </Typography>
    //             <Typography sx={{ ...getUserRoleStyles(role) }} variant="body2" color="text.secondary">
    //               {role}
    //             </Typography>
    //           </ListItem>
    //         </Collapse>
    //       </TransitionGroup>
    //     );
    //   })}
    // </List>
    <div>asd</div>
  );
};

export default UsersTab;
