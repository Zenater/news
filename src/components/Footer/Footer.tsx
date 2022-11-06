import { Typography } from '@material-ui/core';
import React from 'react';

export const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: '#333',
        color: '#fff',
        padding: '20px',
        textAlign: 'center',
      }}
    >
      <Typography component="p" variant="body2" color="inherit">
        © 2022 - Vitaliy Volkov , frontend developer
      </Typography>
    </footer>
  );
};
