import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import DefaultLayout from "@/components/Layout/default";
import SignInForm, { SignInFormData } from "@/components/SignInForm";
import { useSessionContext } from "@/components/SessionContext";
import Loading from "@/components/Loading";
import Config from "@/config";
import { Error } from "@/libs/Database";

function SignIn() {
  const router = useRouter();
  const session = useSessionContext();

  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  if (session.user && router.isReady) router.push(Config.Url.Dashboard);

  const handleSubmit = async (data: SignInFormData) => {
    setError(null);
    setLoading(true);

    const error = await session.database.auth.SignIn({
      email: data.email,
      password: data.password,
    });

    if (error) {
      setError(error);
      setLoading(false);
    } else {
      router.push(Config.Url.Dashboard);
    }
  };

  return (
    <DefaultLayout>
      <div className="grid h-screen place-items-center">
        <Loading isLoading={loading}>
          <div className="card md:card-bordered md:shadow-md w-[350px]">
            <div className="card-body prose">
              <h1>Sign In</h1>
              <SignInForm
                onSubmit={handleSubmit}
                alertProps={
                  !error ? undefined : { type: "error", children: error.text }
                }
              />
              <p className="flex justify-center">
                Doni&lsquo;t have an account?
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
