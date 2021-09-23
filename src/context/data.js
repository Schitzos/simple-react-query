import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import usePersistedState from '../persist';
import { useState } from 'react';

export const DataContext = createContext();
export default function DataContextProvider({ children }) {

  const value = {
    profile: null,
    snackbar: {
      isOpen: false,
      message: '',
      color: 'info'
    },
  };

  const [profile, setProfile] = usePersistedState('profile', value.profile);
  const [snackbar, setSnackbar] = useState(value.snackbar);

  const initialValue = {
    profile, setProfile,
    snackbar, setSnackbar
  };

  return (
    <DataContext.Provider value={initialValue}>
      {children}
    </DataContext.Provider>
  );
}

DataContextProvider.defaultProps = {
  children: null,
};

DataContextProvider.propTypes = {
  children: PropTypes.node,
};
