import { HTMLAttributes } from "react";

export type SignInFormProps = Omit<HTMLAttributes<HTMLFormElement>, "children">;

const SignInForm = (props: SignInFormProps) => {
  return (
    <form data-testid="SignInForm" role="form" {...props}>
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
          autoComplete="on"
          required
          className="input input-bordered"
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
          autoComplete="current-password"
          required
          className="input input-bordered"
        />
      </div>
      <button type="submit" className="btn btn-block mt-8">
        Submit
      </button>
    </form>
  );
};

export default SignInForm;
