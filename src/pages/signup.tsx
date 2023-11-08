import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

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
          <Card className="w-[350px]">
            <CardHeader
              variant="gradient"
              color="gray"
              className="grid place-items-center h-28"
            >
              <Typography variant="h3" color="white">
                Sign Up
              </Typography>
            </CardHeader>
            <CardBody>
              <SignUpForm onSubmit={handleSubmit} alertProps={alertProps} />
            </CardBody>
            <CardFooter>
              <Typography variant="small" className="flex justify-center">
                Already have an account?
                <Link href="/signin" passHref legacyBehavior>
                  <Typography
                    as="a"
                    variant="small"
                    color="gray"
                    className="ml-1 font-bold"
                  >
                    Sign in
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

export default SignUp;
