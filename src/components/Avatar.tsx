import React from 'react';

import { User } from 'firebase/auth';
import { UserIcon } from '@/components/icons';

const Avatar = ({ user, size = 18 }: { user: User | null; size?: number }) => {
  if (user && user.photoURL) {
    return (
      <img
        src={user.photoURL}
        alt='User avatar'
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          objectFit: 'cover',
        }}
      />
    );
  }
  return <UserIcon size={size} />;
};

export default Avatar;
