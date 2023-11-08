import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

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
          <Card className="w-[350px]">
            <CardHeader
              variant="gradient"
              color="gray"
              className="grid place-items-center h-28"
            >
              <Typography variant="h3" color="white">
                Sign In
              </Typography>
            </CardHeader>
            <CardBody>
              <SignInForm
                onSubmit={handleSubmit}
                alertProps={
                  !error ? undefined : { type: "error", children: error.text }
                }
              />
            </CardBody>
            <CardFooter>
              <Typography variant="small" className="flex justify-center">
                Doni&lsquo;t have an account?
                <Link href="/signup" passHref legacyBehavior>
                  <Typography
                    as="a"
                    variant="small"
                    color="gray"
                    className="ml-1 font-bold"
                  >
                    Sign up
                  </Typography>
                </Link>
              </Typography>
            </CardFooter>
          </Card>
        </Loading>
      </div>
    </DefaultLayout>
  );
}

export default SignIn;
