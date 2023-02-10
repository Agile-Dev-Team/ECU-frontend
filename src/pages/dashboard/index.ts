import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuth from 'src/hooks/useAuth';

// ----------------------------------------------------------------------

export default function Index() {
  const router = useRouter();
  const {user} = useAuth();
  useEffect(() => {
    if (router.pathname == '/dashboard') {
      if(user&& user.role && user.role === 'User')
        router.push('/dashboard/upload');
        if(user&& user.role && user.role === 'Admin')
        router.push('/dashboard/admin/user/list');
    }
  });

  return null;
}
