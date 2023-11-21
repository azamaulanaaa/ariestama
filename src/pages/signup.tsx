import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";

import DefaultLayout from "@/components/Layout/default";
import { useSessionContext } from "@/components/SessionContext";
import Loading from "@/components/Loading";
import SignUpForm, { SignUpFormData } from "@/components/SignUpForm";
import { AlertProps } from "@/components/Alert";
import Config from "@/config";

function SignUp() {
  const router = useRouter();
  const session = useSessionContext();

  const [alertProps, setAlertProps] = useState<AlertProps | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState<boolean>(false);

  if (session.user && router.isReady) router.push(Config.Url.Dashboard);

  const handleSubmit = async (data: SignUpFormData) => {
    setAlertProps(undefined);
    setLoading(true);
    const error = await session.database.auth.SignUp({
      email: data.email,
      password: data.password,
    });
    if (error) {
      setAlertProps({ type: "error", children: error.text });
      setLoading(false);
      return;
    }
    setAlertProps({
      type: "success",
      children: "Sign up successful. Check your email for verification.",
    });
    setLoading(false);
    return;
  };

  return (
    <DefaultLayout>
      <div className="grid h-screen place-items-center">
        <Loading isLoading={loading}>
          <div className="card md:card-bordered md:shadow-md w-[350px]">
            <div className="card-body prose">
              <h1>Sign Up</h1>
              <SignUpForm onSubmit={handleSubmit} alertProps={alertProps} />
              <p>
                Already have an account?
                <Link href="/signin" passHref legacyBehavior>
                  <a className="ml-[1ex] font-medium">Sign in</a>
                </Link>
              </p>
            </div>
          </div>
        </Loading>
      </div>
    </DefaultLayout>
  );
}

export default SignUp;
