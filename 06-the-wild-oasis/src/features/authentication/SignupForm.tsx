import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { SignUp } from "../../libs/common.type";
import { useSignup } from "./useSignup";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { signup, isPending } = useSignup();
  const { register, formState, getValues, handleSubmit, reset } = useForm<
    SignUp & { passwordConfirm: string }
  >();
  const { errors } = formState;

  function onSubmit({ fullName, email, password }: SignUp) {
    signup({ fullName, email, password }, { onSettled: () => reset() });
  }

  return (
    <Form type="regular" onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message?.toString()}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", { required: "This field is required" })}
          disabled={isPending}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message?.toString()}>
        <Input
          type="email"
          id="email"
          disabled={isPending}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address ",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message?.toString()}
      >
        <Input
          type="password"
          id="password"
          disabled={isPending}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password should be at least 8 characters long.",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Repeat password"
        error={errors?.passwordConfirm?.message?.toString()}
      >
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isPending}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Passwords need to match.",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disabled={isPending} onClick={reset}>
          Cancel
        </Button>
        <Button disabled={isPending}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
