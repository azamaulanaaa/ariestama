import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import DefaultLayout from "@/layout/Default";
import SignInForm, {
  SignInFormData,
} from "@/features/authentication/SignInForm";
import { useSessionContext } from "@/contexts/Session";
import Loading from "@/components/Loading";
import Config from "@/config";
import { useAlertsContext } from "@/contexts/Alerts";

function SignIn() {
  const router = useRouter();
  const session = useSessionContext();
  const alerts = useAlertsContext();

  const [loading, setLoading] = useState<boolean>(false);

  if (session.user && router.isReady) router.push(Config.Url.Dashboard);

  const handleSubmit = async (data: SignInFormData) => {
    setLoading(true);

    const error = await session.database.auth.SignIn({
      email: data.email,
      password: data.password,
    });

    if (error) {
      alerts.dispatch({
        kind: "add",
        id: Date.now().toString(),
        type: "error",
        message: error.text,
      });
      setLoading(false);
    } else {
      router.push(Config.Url.Dashboard);
    }
  };

  return (
    <DefaultLayout>
      <div className="grid h-screen place-items-center">
        <Loading isLoading={loading}>
          <div className="card md:card-bordered md:shadow-md max-w-[350px]">
            <div className="card-body prose max-w-none">
              <h1>Sign In</h1>
              <SignInForm onSubmit={handleSubmit} />
              <p className="flex justify-center">
                Don&lsquo;t have an account?
                <Link href="/signup" passHref legacyBehavior>
                  <a className="ml-[1ex] font-medium">Sign up</a>
                </Link>
              </p>
            </div>
          </div>
        </Loading>
      </div>
    </DefaultLayout>
  );
}

export default SignIn;
