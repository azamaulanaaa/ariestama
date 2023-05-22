import { useEffect, useState } from 'react';

import Database from '@/libs/Database';
import type { User } from '@/libs/Database';
export type { User } from '@/libs/Database';

const useUser = (database: Database) => {
    const [user, setUser] = useState<User | null | undefined>(undefined);

    useEffect(() => {
        database.user.getMine().then((result) => {
            if (result.error || result.data.length == 0) {
                setUser(null);
                return;
            }

            setUser(result.data[0]);
        });
    }, [database]);

    return user;
};

export default useUser;
