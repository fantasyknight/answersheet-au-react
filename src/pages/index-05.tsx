import type { NextPage } from "next";
import { GetStaticProps } from "next";
import SEO from "@components/seo/page-seo";
import Layout from "@layout/layout-01";
import HeroArea from "@containers/hero/layout-05";
import ServiceArea from "@containers/service/layout-04";
import FaqArea from "@containers/faq/layout-01";
import FunfactArea from "@containers/funfact/layout-02";
import CourseArea from "@containers/course/layout-06";
import RegisterGuideArea from "@containers/register-guide";
import AppDownloadArea from "@containers/app-download";
import EventArea from "@containers/event/layout-03";
import TestimonialArea from "@containers/testimonial/layout-02";
import CtaArea from "@containers/cta/layout-02";

import { normalizedData } from "@utils/methods";
import { ICourse, IEvent } from "@utils/types";

import { getPageData } from "../lib/page";
import { getallCourses } from "../lib/course";
import { getallEvents } from "../lib/event";

interface PageContent {
    section: string;
}

type TProps = {
    data: {
        page: {
            content: PageContent[];
        };
        courses: ICourse[];
        events: IEvent[];
    };
};

type PageProps = NextPage<TProps> & {
    Layout: typeof Layout;
};

const Home: PageProps = ({ data }) => {
    const content = normalizedData<PageContent>(data.page?.content, "section");

    return (
        <>
            <SEO title="Remote Training" />
            <HeroArea data={content?.["hero-area"]} />
            <ServiceArea data={content?.["service-area"]} titleSize="large" />
            <FaqArea
                data={content?.["faq-area"]}
                space="bottom"
                titleSize="large"
            />
            <FunfactArea
                data={content?.["funfact-area"]}
                space="top"
                bg="tw-bg-gray-100"
            />
            <CourseArea
                data={{ ...content?.["course-area"], courses: data.courses }}
                titleSize="large"
                bg="tw-bg-gray-100"
            />
            <RegisterGuideArea
                data={content?.["register-guide-area"]}
                titleSize="large"
            />
            <AppDownloadArea
                data={content?.["app-download-area"]}
                titleSize="large"
                space="top"
            />
            <EventArea
                data={{ ...content?.["event-area"], events: data.events }}
                titleSize="large"
            />
            <TestimonialArea data={content?.["testimonial-area"]} />
            <CtaArea
                data={content?.["cta-area"]}
                bg="tw-bg-light-100"
                space="bottom"
            />
        </>
    );
};

Home.Layout = Layout;

export const getStaticProps: GetStaticProps = () => {
    const page = getPageData("home", "index-05");
    const courses = getallCourses(
        [
            "title",
            "thumbnail",
            "price",
            "currency",
            "total_lectures",
            "total_students",
        ],
        0,
        6
    );
    const events = getallEvents(
        ["title", "thumbnail", "start_date", "location"],
        0,
        6
    );

    return {
        props: {
            data: {
                page,
                courses,
                events,
            },

            layout: {
                headerTransparent: true,
                headerFluid: false,
                footerMode: "light",
            },
        },
    };
};

export default Home;
