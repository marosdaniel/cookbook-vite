import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CHANGE_PASSWORD } from '../../../../../graphql/user/editUser';

import { IProps } from './types';

const Password = ({ userId }: IProps) => {
  const [changePassword] = useMutation(CHANGE_PASSWORD);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState<string>('');

  const [isPasswordEditable, setIsPasswordEditable] = useState(false);

  const saveDisabled = !currentPassword || !newPassword || !confirmNewPassword || newPassword !== confirmNewPassword;

  const handleCancelPassword = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    setIsPasswordEditable(false);
  };

  // const handleSavePassword = async () => {
  //   try {
  //     if (saveDisabled) {
  //       return;
  //     }
  //     const passwordEditInput = {
  //       currentPassword: currentPassword,
  //       newPassword: newPassword,
  //       confirmNewPassword: confirmNewPassword,
  //     };
  //     await changePassword({
  //       variables: {
  //         userId,
  //         passwordEditInput,
  //       },
  //     });
  //     setMessageSeverity('success');
  //     setAlertMessage('Password changed successfully');
  //     handleCancelPassword();
  //   } catch (_error: any) {
  //     setMessageSeverity('error');
  //     setAlertMessage(_error.message);
  //   }
  // };

  return (
    // <Box sx={sectionStyles}>
    //   <Box sx={innerBoxStyles}>
    //     <Typography variant="h5">Change your password</Typography>
    //     {!isPasswordEditable ? (
    //       <Button sx={editButtonStyles} variant="text" color="primary" onClick={() => setIsPasswordEditable(true)}>
    //         Edit
    //       </Button>
    //     ) : null}
    //   </Box>
    //   {!isPasswordEditable ? (
    //     <>
    //       <Typography marginTop={1} variant="body2" sx={labelStyles} color="GrayText">
    //         Password
    //       </Typography>
    //       <Typography variant="body1">**********</Typography>
    //     </>
    //   ) : null}
    //   <Box sx={{ display: isPasswordEditable ? 'flex' : 'none' }}>
    //     <Grow
    //       in={isPasswordEditable}
    //       style={{ transformOrigin: '0 0 0' }}
    //       {...(isPasswordEditable ? { timeout: 300 } : {})}
    //     >
    //       <Box sx={{ width: '100%' }}>
    //         <TextField
    //           variant="standard"
    //           label="Password"
    //           value={currentPassword}
    //           fullWidth
    //           required
    //           margin="normal"
    //           type="password"
    //           onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
    //             setCurrentPassword(event.target.value);
    //           }}
    //         />
    //         <TextField
    //           variant="standard"
    //           label="New password"
    //           value={newPassword}
    //           fullWidth
    //           required
    //           margin="normal"
    //           type="password"
    //           onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
    //             setNewPassword(event.target.value);
    //           }}
    //         />
    //         <TextField
    //           variant="standard"
    //           label="Confirm new password"
    //           value={confirmNewPassword}
    //           fullWidth
    //           required
    //           margin="normal"
    //           type="password"
    //           onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
    //             setConfirmNewPassword(event.target.value);
    //           }}
    //         />
    //         <Box display="flex" justifyContent="flex-end" marginTop={2} gap={1}>
    //           <Button size="small" variant="text" color="primary" onClick={handleCancelPassword}>
    //             Cancel
    //           </Button>
    //           <Button
    //             size="small"
    //             variant="contained"
    //             color="primary"
    //             onClick={handleSavePassword}
    //             disabled={saveDisabled}
    //           >
    //             Save
    //           </Button>
    //         </Box>
    //       </Box>
    //     </Grow>
    //   </Box>
    //   <AlertSnack message={alertMessage} setMessage={setAlertMessage} severity={messageSeverity} />
    // </Box>
    <div>asd</div>
  );
};

export default Password;
