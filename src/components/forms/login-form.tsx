/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "@hooks";
import Input from "@ui/form-elements/input";
import Checkbox from "@ui/form-elements/checkbox";
import FeedbackText from "@ui/form-elements/feedback";
import Button from "@ui/button";
import { hasKey } from "@utils/methods";
import { useUser } from "@contexts/user-context";
import axios from "@utils/api";

interface IFormValues {
    email: string;
    password: string;
}

const LoginForm = () => {
    const [serverState, setServerState] = useState("");
    const { setLogin } = useUser();
    const { signIn } = useAuth();
    // const { data, status } = useSession();
    // const session = getSession();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormValues>({
        defaultValues: {
            email: "greatblueknight@gmail.com",
            password: "+WCN-Dqv3;(NzZ",
        },
    });
    const onSubmit: SubmitHandler<IFormValues> = (data) => {
        // signIn();
        console.log(data);
        axios
            .post("/api/auth/login", [data])
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
        <div className="tw-bg-white tw-shadow-2xs tw-shadow-heading/10 tw-w-[470px] tw-pt-7.5 tw-pb-[50px] tw-px-[50px]">
            <h3 className="tw-text-h2 tw-mb-5">Login</h3>
            <form id="login-form" onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="tw-mb-7.5">
                    <label
                        htmlFor="email"
                        className="tw-text-heading tw-text-md"
                    >
                        Email *
                    </label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Email"
                        bg="light"
                        feedbackText={errors?.email?.message}
                        state={hasKey(errors, "email") ? "error" : "success"}
                        showState={!!hasKey(errors, "email")}
                        {...register("email", {
                            required: "Email is required",
                        })}
                    />
                    <small>Default Email: user@domain.com</small>
                </div>
                <div className="tw-mb-7.5">
                    <label
                        htmlFor="password"
                        className="tw-text-heading tw-text-md"
                    >
                        Password *
                    </label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="Password"
                        bg="light"
                        autoComplete="true"
                        feedbackText={errors?.password?.message}
                        state={hasKey(errors, "password") ? "error" : "success"}
                        showState={!!hasKey(errors, "password")}
                        {...register("password", {
                            required: "Password is required",
                        })}
                    />
                    <small>Default Password: Admin</small>
                </div>
                <Checkbox name="remember" id="remember" label="Remember me" />
                <div className="tw-flex tw-justify-between -tw-mx-2">
                    <Button
                        type="submit"
                        className="tw-mt-7.5 tw-mx-2 tw-flex-1"
                    >
                        Log In
                    </Button>
                    <Button
                        path="/register"
                        color="primary"
                        className="tw-mt-7.5 tw-mx-2 tw-flex-1"
                    >
                        Register
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

export default LoginForm;
