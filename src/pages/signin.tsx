import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";

import DefaultLayout from "@/layout/Default";
import SignInForm from "@/features/authentication/SignInForm";
import { useSessionContext } from "@/contexts/Session";
import Config from "@/config";
import { useAlertsContext } from "@/contexts/Alerts";
import useUserSession from "@/hooks/useUserSession";
import ProtectedPage from "@/features/authentication/ProtectedPage";
import Loading from "@/features/authentication/Loading";

const SignInPage = () => {
  const session = useSessionContext();
  const alerts = useAlertsContext();

  const user = useUserSession(session.database);

  const [loading, setLoading] = useState<boolean>(false);
  const [succesSignIn, setSuccesSignIn] = useState<boolean>(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    setLoading(true);

    session.database.auth
      .signInWithPassword({
        email: data.email.toString(),
        password: data.password.toString(),
      })
      .then(({ data, error }) => {
        if (error) {
          alerts.dispatch({
            kind: "add",
            id: Date.now().toString(),
            type: "error",
            message: error.message,
          });
          setLoading(false);
        }
        if (data.session) {
          setSuccesSignIn(true);
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    if (user.session?.error) {
      alerts.dispatch({
        kind: "add",
        id: Date.now().toString(),
        type: "error",
        message: user.session?.error.message,
      });
    }
  }, [user]);

  return (
    <ProtectedPage
      hasAccess={user.session?.data.session == null && !succesSignIn}
      redirectUrl={Config.Url.Dashboard}
    >
      <DefaultLayout>
        <div className="grid h-screen place-items-center">
          <div className="card md:card-bordered md:shadow-md max-w-[350px]">
            <div className="card-body prose max-w-none">
              <h1>Sign In</h1>
              <Loading isLoading={loading}>
                <SignInForm onSubmit={handleSubmit} />
                <p className="flex justify-center">
                  Don&lsquo;t have an account?
                  <Link href="/signup" passHref legacyBehavior>
                    <a className="ml-[1ex] font-medium">Sign up</a>
                  </Link>
                </p>
              </Loading>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </ProtectedPage>
  );
};

export default SignInPage;
