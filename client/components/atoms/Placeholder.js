import React from 'react';
import { Icon } from '@rmwc/icon';

const Placeholder = (props) => (
  <div className='placeholder'
    style={{
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: props.theme.surface,
      padding: '50% 0',
      borderRadius: '2px',
      boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
      boxSizing: 'border-box'
    }}>
    <Icon className='spin' icon='data_usage' iconOptions={{strategy: 'ligature'}}
      style={{
        color: props.theme.onSurface
      }} />
  </div>
);

export default Placeholder;
