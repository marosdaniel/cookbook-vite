import { CopyButton, Tooltip, ActionIcon } from '@mantine/core';
import { FaCheck, FaCopy } from 'react-icons/fa';
import { IProps } from './types';

const CopyActionButton = ({ path }: IProps) => {
  return (
    <CopyButton value={path} timeout={3000}>
      {({ copied, copy }) => (
        <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
          <ActionIcon color={copied ? 'teal' : 'cyan.4'} variant="subtle" onClick={copy}>
            {copied ? <FaCheck /> : <FaCopy />}
          </ActionIcon>
        </Tooltip>
      )}
    </CopyButton>
  );
};

export default CopyActionButton;
