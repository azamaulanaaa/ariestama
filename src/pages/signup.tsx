import { FormEvent, useState } from "react";
import Link from "next/link";

import DefaultLayout from "@/layout/Default";
import { useSessionContext } from "@/contexts/Session";
import SignUpForm from "@/features/authentication/SignUpForm";
import Config from "@/config";
import { useAlertsContext } from "@/contexts/Alerts";
import useUserSession from "@/hooks/useUserSession";
import ProtectedPage from "@/features/authentication/ProtectedPage";

function SignUpPage() {
  const session = useSessionContext();
  const alert = useAlertsContext();

  const user = useUserSession(session.database);

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    session.database.auth
      .signUp({
        email: data.email.toString(),
        password: data.password.toString(),
      })
      .then(({ error }) => {
        if (error) {
          alert.dispatch({
            kind: "add",
            id: Date.now().toString(),
            type: "error",
            message: error.message,
          });
          setLoading(false);
        } else {
          alert.dispatch({
            kind: "add",
            id: Date.now().toString(),
            type: "success",
            message: "Sign up successful. Check your email for verification.",
          });
        }
        setLoading(false);
      });
  };

  return (
    <ProtectedPage
      redirectUrl={Config.Url.Dashboard}
      hasAccess={user.session?.data.session == null}
      isReady={!(user.session == null || loading)}
    >
      <DefaultLayout>
        <div className="grid h-screen place-items-center">
          <div className="card md:card-bordered md:shadow-md max-w-[350px]">
            <div className="card-body prose max-w-none">
              <h1>Sign Up</h1>
              <SignUpForm onSubmit={handleSubmit} />
              <p>
                Already have an account?
                <Link href="/signin" passHref legacyBehavior>
                  <a className="ml-[1ex] font-medium">Sign in</a>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </ProtectedPage>
  );
}

export default SignUpPage;
