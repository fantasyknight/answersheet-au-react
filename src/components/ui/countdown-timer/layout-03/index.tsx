import clsx from "clsx";
import dynamic from "next/dynamic";
import { useCountdown } from "@hooks";

const DateTimeDisplay = dynamic(() => import("./date-time-display"), {
    ssr: false,
});

type TProps = {
    tragetDate: string;
    className?: string;
    align?: "left" | "center";
};

const CountdownTimer = ({ tragetDate, className, align }: TProps) => {
    const [days, hours, minutes, seconds] = useCountdown(tragetDate);

    return (
        <div
            className={clsx(
                "tw-flex",
                align === "center" && "tw-mx-auto",
                className
            )}
        >
            <DateTimeDisplay value={days} />
            <DateTimeDisplay value={hours} />
            <DateTimeDisplay value={minutes} />
            <DateTimeDisplay value={seconds} />
        </div>
    );
};

CountdownTimer.defaultProps = {
    align: "center",
};

export default CountdownTimer;
