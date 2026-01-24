import { useStyles } from '@shared/styles';

export const Restricted = () => {
  const { restrictedStyle } = useStyles();

  return (
    <div style={restrictedStyle}>
      <h1>Access Denied</h1>
      <p>You do not have permission to view this page.</p>
    </div>
  );
};
