import { ReactNode } from "react";
import { useRouter } from "next/router";

import Loading from "../Loading";

export type ProtectedPageProps = {
  children: ReactNode;
  hasAccess: boolean;
  redirectUrl: string;
  isReady: boolean;
};

const ProtectedPage = (props: ProtectedPageProps) => {
  const router = useRouter();

  if (router.isReady && props.isReady && !props.hasAccess)
    router.push(props.redirectUrl);

  return (
    <Loading isLoading={!router.isReady || !props.isReady}>
      {props.children}
    </Loading>
  );
};

export default ProtectedPage;