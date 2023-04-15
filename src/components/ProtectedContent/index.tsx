import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import Loading from '@/components/Loading';

export type ProtectedContentProps = {
    children: ReactNode;
    hasAccess: boolean;
    redirectUrl: string;
    isReady: boolean;
};

const ProtectedContent = (props: ProtectedContentProps) => {
    const router = useRouter();

    if (router.isReady && props.isReady && !props.hasAccess)
        router.push(props.redirectUrl);

    return (
        <Loading isLoading={!router.isReady || !props.isReady}>
            {props.children}
        </Loading>
    );
};

export default ProtectedContent;
