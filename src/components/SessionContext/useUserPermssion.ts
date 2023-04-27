import { useEffect, useState } from 'react';

import Database from '@/libs/Database';
import { Database as DatabaseType } from '@/libs/Database/supabase';

type ReservedUserPermissionKey = 'id' | 'created_at';
type UserPermissionKey =
    | 'signin'
    | Exclude<
          keyof DatabaseType['public']['Tables']['user_permission']['Row'],
          ReservedUserPermissionKey
      >;
export type UserPermission = {
    [key in UserPermissionKey]?: boolean;
};

const useUserPermission = (database: Database) => {
    const [userPermission, setUserPermission] = useState<UserPermission | null>(
        null
    );

    useEffect(() => {
        database.user_permission.mine().then((permission) => {
            if (permission == null) {
                setUserPermission({
                    signin: false,
                });
                return;
            }

            setUserPermission({
                signin: true,
                permission,
            } as UserPermission);
        });
    }, [database]);

    return userPermission;
};

export default useUserPermission;
