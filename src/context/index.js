import React from 'react';
import PropTypes from 'prop-types';
import DataContextProvider, { DataContext } from './data';

export { DataContext };
export default function ContextProvider({ children }) {
  return (
    <DataContextProvider>
      {children}
    </DataContextProvider>
  );
}

ContextProvider.defaultProps = {
  children: null,
};

ContextProvider.propTypes = {
  children: PropTypes.node,
};
