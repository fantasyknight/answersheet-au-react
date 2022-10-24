import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "@hooks";
import axios from "@utils/api";

import Input from "@ui/form-elements/input";
import Button from "@ui/button";
import FeedbackText from "@ui/form-elements/feedback";
import { hasKey } from "@utils/methods";
import { useUser } from "@contexts/user-context";

interface IFormValues {
    email: string;
    reg_username: string;
    reg_password: string;
    confirmPassword: string;
}

type ResponseType = {
    status: string;
    message: string;
    token?: string;
};

const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm<IFormValues>();
    const [serverState, setServerState] = useState("");
    const { setLogin } = useUser();
    const { signIn } = useAuth();

    const onSubmit: SubmitHandler<IFormValues> = (data) => {
        // eslint-disable-next-line no-console
        console.log(data);
        axios
            .post<ResponseType>("/api/auth/register", [data])
            .then((res) => {
                console.log(res);
                setLogin();
                setServerState("");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="tw-w-[570px] tw-px-[50px]">
            <h3 className="tw-text-h2 tw-mb-5">Register</h3>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="tw-mb-7.5">
                    <label
                        htmlFor="email"
                        className="tw-text-heading tw-text-md"
                    >
                        Email *
                    </label>
                    <Input
                        id="email"
                        placeholder="Email"
                        bg="light"
                        feedbackText={errors?.email?.message}
                        state={hasKey(errors, "email") ? "error" : "success"}
                        showState={!!hasKey(errors, "email")}
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: "invalid email address",
                            },
                        })}
                    />
                </div>
                <div className="tw-mb-7.5">
                    <label
                        htmlFor="reg_username"
                        className="tw-text-heading tw-text-md"
                    >
                        Username *
                    </label>
                    <Input
                        id="reg_username"
                        placeholder="Username"
                        bg="light"
                        feedbackText={errors?.reg_username?.message}
                        state={
                            hasKey(errors, "reg_username") ? "error" : "success"
                        }
                        showState={!!hasKey(errors, "reg_username")}
                        {...register("reg_username", {
                            required: "Username is required",
                        })}
                    />
                </div>
                <div className="tw-mb-7.5">
                    <label
                        htmlFor="reg_password"
                        className="tw-text-heading tw-text-md"
                    >
                        Password *
                    </label>
                    <Input
                        id="reg_password"
                        type="password"
                        placeholder="Password"
                        bg="light"
                        autoComplete="true"
                        feedbackText={errors?.reg_password?.message}
                        state={
                            hasKey(errors, "reg_password") ? "error" : "success"
                        }
                        showState={!!hasKey(errors, "reg_password")}
                        {...register("reg_password", {
                            required: "Password is required",
                        })}
                    />
                </div>
                <div className="tw-mb-7.5">
                    <label
                        htmlFor="confirmPassword"
                        className="tw-text-heading tw-text-md"
                    >
                        Password *
                    </label>
                    <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        bg="light"
                        autoComplete="true"
                        feedbackText={errors?.confirmPassword?.message}
                        state={
                            hasKey(errors, "confirmPassword")
                                ? "error"
                                : "success"
                        }
                        showState={!!hasKey(errors, "confirmPassword")}
                        {...register("confirmPassword", {
                            required: "Confirm Password is required",
                            validate: (value) =>
                                value === getValues("reg_password") ||
                                "The passwords do not match",
                        })}
                    />
                </div>

                <div className="tw-flex tw-justify-between -tw-mx-2">
                    <Button
                        type="submit"
                        className="tw-mt-7.5 tw-mx-2 tw-flex-1"
                    >
                        Register
                    </Button>
                    <Button
                        path="/login"
                        color="primary"
                        className="tw-mt-7.5 tw-mx-2 tw-flex-1"
                    >
                        Log In
                    </Button>
                </div>

                <Button
                    onClick={() => signIn("google")}
                    fullwidth
                    className="tw-mt-5"
                >
                    Log in with Google
                </Button>
                <Button
                    onClick={() => signIn("facebook")}
                    fullwidth
                    className="tw-mt-5"
                >
                    Log in with Facebook
                </Button>
                {serverState && <FeedbackText>{serverState}</FeedbackText>}
            </form>
        </div>
    );
};

export default RegisterForm;
