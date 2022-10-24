import { useEffect } from "react";
import type { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import SEO from "@components/seo/page-seo";
import Layout from "@layout/layout-01";
import Breadcrumb from "@components/breadcrumb";
import RegisterForm from "@components/forms/register-form";
import Spinner from "@ui/spinner";
import { useUser } from "@contexts/user-context";
import { useMount } from "@hooks";

type PageProps = NextPage & {
    Layout: typeof Layout;
};

const Register: PageProps = () => {
    const mounted = useMount();
    const { isLoggedIn } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (isLoggedIn) {
            void router.push("/profile");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router]);

    if (!mounted) return null;

    if (!isLoggedIn) {
        return (
            <>
                <SEO title="Register" />
                <Breadcrumb
                    pages={[{ path: "/", label: "home" }]}
                    currentPage="Register"
                    showTitle={false}
                />
                <div className="tw-container tw-flex tw-justify-center tw-pb-15 md:tw-pb-20 lg:tw-pb-[100px]">
                    <RegisterForm />
                </div>
            </>
        );
    }

    return (
        <div className="tw-fixed tw-bg-light-100 tw-top-0 tw-z-50 tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center">
            <Spinner />
        </div>
    );
};

Register.Layout = Layout;

export const getStaticProps: GetStaticProps = () => {
    return {
        props: {
            layout: {
                headerShadow: true,
                headerFluid: false,
                footerMode: "light",
            },
        },
    };
};

export default Register;
