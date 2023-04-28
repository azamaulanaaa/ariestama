import { useEffect, useState } from 'react';

import Database from '@/libs/Database';

export type UserPermission = {
    signin: boolean;
    read_other_profile: boolean;
    read_company: boolean;
    iud_company: boolean;
    read_unit: boolean;
    iud_unit: boolean;
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
                    read_other_profile: false,
                    read_company: false,
                    iud_company: false,
                    read_unit: false,
                    iud_unit: false,
                });
                return;
            }

            setUserPermission({
                signin: true,
                ...permission,
            } as UserPermission);
        });
    }, [database]);

    return userPermission;
};

export default useUserPermission;
