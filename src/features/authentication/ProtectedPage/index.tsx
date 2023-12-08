import { ReactNode } from "react";
import { useRouter } from "next/router";

export type ProtectedPageProps = {
  children: ReactNode;
  hasAccess: boolean;
  redirectUrl: string;
};

const ProtectedPage = (props: ProtectedPageProps) => {
  const router = useRouter();

  if (router.isReady && !props.hasAccess) router.push(props.redirectUrl);

  return props.children;
};

export default ProtectedPage;
