import { FormEvent } from "react";

import Alert, { AlertProps } from "@/components/Alert";

interface SignInFormProps {
  onSubmit?: (data: SignInFormData) => void;
  alertProps?: AlertProps;
}

export interface SignInFormData {
  email: string;
  password: string;
}

const SignInForm = (props: SignInFormProps) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!props.onSubmit) return;

    const form = event.currentTarget;
    const form_data = new FormData(form);

    const email_form = form_data.get("email");
    const password_form = form_data.get("password");

    if (!email_form || !password_form) return;

    props.onSubmit({
      email: email_form.toString(),
      password: password_form.toString(),
    });
  };

  const FormAlert = () => {
    if (!props.alertProps) return null;
    return <Alert {...props.alertProps} />;
  };

  return (
    <form role="form" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-6">
        <FormAlert />
        <div className="form-control">
          <label htmlFor="email" className="label">
            <span className="label-text">
              Email<span className="text-red-400">*</span>
            </span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="example@domain.com"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="password" className="label">
            <span className="label-text">
              Password<span className="text-red-400">*</span>
            </span>
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="$ecr3tKey."
            className="input input-bordered"
            required
          />
        </div>
      </div>
      <button type="submit" className="btn btn-block mt-8">
        Submit
      </button>
    </form>
  );
};

export default SignInForm;
