import { FormEvent, ChangeEvent, useRef, useState } from "react";

export interface SignUpFormProps {
  onSubmit?: (data: SignUpFormData) => void;
}

export interface SignUpFormData {
  email: string;
  password: string;
}

const SignUpForm = (props: SignUpFormProps) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const [passwordMatch, setPasswordMatch] = useState<boolean>(true);
  const [passwordEnoughLength, setPasswordEnoughLength] =
    useState<boolean>(true);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !props.onSubmit ||
      !emailRef.current ||
      !passwordRef.current ||
      !confirmPasswordRef.current
    )
      return;

    if (!validatePassword) return;

    props.onSubmit({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
  };

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
    <form role="form" onSubmit={handleSubmit}>
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
        <label htmlFor="confirm-password" className="label">
          <span className="label-text">
            Confirm Password<span className="text-red-400">*</span>
          </span>
        </label>
        <input
          ref={confirmPasswordRef}
          id="confirm-password"
          name="confirm-password"
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
