import { ChangeEvent, useRef, useState, HTMLAttributes } from "react";

export type SignUpFormProps = Omit<HTMLAttributes<HTMLFormElement>, "children">;

const SignUpForm = (props: SignUpFormProps) => {
  const [passwordMatch, setPasswordMatch] = useState<boolean>(true);
  const [passwordEnoughLength, setPasswordEnoughLength] =
    useState<boolean>(true);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const validatePassword = () => {
    if (!passwordRef.current || !confirmPasswordRef.current) return;

    if (passwordRef.current.value.length < 6) {
      setPasswordEnoughLength(false);
      passwordRef.current.setCustomValidity("Password length is less than 6");
    } else {
      setPasswordEnoughLength(true);
      passwordRef.current.setCustomValidity("");
    }

    if (passwordRef.current.value != confirmPasswordRef.current.value) {
      setPasswordMatch(false);
      confirmPasswordRef.current.setCustomValidity(
        "Confirm Password does not match to Password",
      );
    } else {
      setPasswordMatch(true);
      confirmPasswordRef.current.setCustomValidity("");
    }

    return passwordEnoughLength && passwordMatch;
  };

  const handlePasswordChange = (_: ChangeEvent<HTMLInputElement>) => {
    validatePassword();
  };

  return (
    <form data-testid="SignUpForm" role="form" {...props}>
      <div className="form-control">
        <label htmlFor="email" className="label">
          <span className="label-text">
            Email<span className="text-red-400">*</span>
          </span>
        </label>
        <input
          ref={emailRef}
          id="email"
          name="email"
          type="email"
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
          ref={passwordRef}
          id="password"
          name="password"
          type="password"
          className={
            "input input-bordered" +
            (passwordMatch == false ? " input-error" : "")
          }
          required
          minLength={6}
          onInput={handlePasswordChange}
        />
      </div>
      <div className="form-control">
        <label htmlFor="confirmPassword" className="label">
          <span className="label-text">
            Confirm Password<span className="text-red-400">*</span>
          </span>
        </label>
        <input
          ref={confirmPasswordRef}
          id="confirmPassword"
          type="password"
          className={
            "input input-bordered" +
            (passwordMatch == false ? " input-error" : "")
          }
          required
          onInput={handlePasswordChange}
        />
      </div>
      <button
        type="submit"
        className="btn btn-block mt-8"
        disabled={!passwordMatch}
      >
        Submit
      </button>
    </form>
  );
};

export default SignUpForm;
