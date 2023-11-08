import { useRouter } from "next/router";

import DefaultLayout from "@/components/Layout/default";
import { useSessionContext } from "@/components/SessionContext";
import Loading from "@/components/Loading";
import Config from "@/config";

const SignOut = () => {
  const router = useRouter();
  const session = useSessionContext();

  if (router.isReady) {
    session.database.auth.SignOut().then((error) => {
      if (error) return;
      router.push(Config.Url.SignIn);
    });
  }

  return (
    <DefaultLayout>
      <div className="grid h-screen place-items-centers">
        <Loading />
      </div>
    </DefaultLayout>
  );
};

export default SignOut;
