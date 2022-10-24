import type { GetStaticProps, NextPage } from "next";
import SEO from "@components/seo/page-seo";
import Layout01 from "@layout/layout-01";
import Breadcrumb from "@components/breadcrumb";
import MembershipArea from "@containers/membership";
import { getallCourses } from "../lib/course";

type TProps = {
    data: {
        membershipLevels: Array<{
            title: string;
            path: string;
            membership: string[];
        }>;
    };
};

type PageProps = NextPage<TProps> & {
    Layout: typeof Layout01;
};

const MembershipLevels: PageProps = ({ data }) => {
    return (
        <>
            <SEO title="Membershipt levels" />
            <Breadcrumb
                pages={[{ path: "/", label: "home" }]}
                currentPage="Membership Levels"
            />
            <MembershipArea membershipLevels={data.membershipLevels} />
        </>
    );
};

MembershipLevels.Layout = Layout01;

export const getStaticProps: GetStaticProps = () => {
    const membershipLevels = getallCourses(["title", "membership"]);
    return {
        props: {
            data: {
                membershipLevels,
            },
            layout: {
                headerShadow: true,
                headerFluid: false,
                footerMode: "light",
            },
        },
    };
};

export default MembershipLevels;
