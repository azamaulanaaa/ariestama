import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";

import DefaultLayout from "@/layout/Default";
import { useSessionContext } from "@/contexts/Session";
import Loading from "@/components/Loading";
import SignUpForm, {
  SignUpFormData,
} from "@/features/authentication/SignUpForm";
import Config from "@/config";
import { useAlertsContext } from "@/contexts/Alerts";

function SignUp() {
  const router = useRouter();
  const session = useSessionContext();
  const alert = useAlertsContext();

  const [loading, setLoading] = useState<boolean>(false);

  if (session.user && router.isReady) router.push(Config.Url.Dashboard);

  const handleSubmit = async (data: SignUpFormData) => {
    setLoading(true);
    const error = await session.database.auth.SignUp({
      email: data.email,
      password: data.password,
    });
    if (error) {
      alert.dispatch({
        kind: "add",
        id: Date.now().toString(),
        type: "error",
        message: error.text,
      });
      setLoading(false);
      return;
    }
    alert.dispatch({
      kind: "add",
      id: Date.now().toString(),
      type: "success",
      message: "Sign up successful. Check your email for verification.",
    });
    setLoading(false);
    return;
  };

  return (
    <DefaultLayout>
      <div className="grid h-screen place-items-center">
        <Loading isLoading={loading}>
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
        </Loading>
      </div>
    </DefaultLayout>
  );
}

export default SignUp;
