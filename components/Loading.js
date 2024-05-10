import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography'; // Typographyをインポート
import styles from '/styles/Loading.module.css';

export function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <Stack sx={{ color: 'grey.500', alignItems: 'center' }} spacing={2}>
        <Typography variant="h6">Loading...</Typography>
        <Stack direction="row" spacing={2}>
          <CircularProgress color="success" />
        </Stack>
      </Stack>
    </div>
  );
}

