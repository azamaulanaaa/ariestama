import { useRouter } from "next/router";

import useLayout from "@/components/Layout";
import { useSessionContext } from "@/components/SessionContext";
import Loading from "@/components/Loading";
import Config from "@/config";

const SignOut = () => {
  const router = useRouter();
  const session = useSessionContext();
  useLayout().default();

  if (router.isReady) {
    session.database.auth.SignOut().then((error) => {
      if (error) return;
      router.push(Config.Url.SignIn);
    });
  }

  return (
    <div className="grid h-screen place-items-centers">
      <Loading />
    </div>
  );
};

export default SignOut;
