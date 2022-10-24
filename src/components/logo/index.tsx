import Link from "next/link";
import clsx from "clsx";

type TProps = {
    variant?: "dark" | "light";
    className?: string;
};

const Logo = ({ variant, className }: TProps) => {
    return (
        <Link href="/">
            <a className={clsx("tw-inline-block", className)}>
                {variant === "dark" && (
                    <img
                        src="/images/logo/dark-logo.png"
                        alt="Logo"
                        width={158}
                        height={26}
                    />
                )}
                {variant === "light" && (
                    <img
                        src="/images/logo/light-logo.png"
                        alt="Logo"
                        width={158}
                        height={26}
                    />
                )}
            </a>
        </Link>
    );
};

export default Logo;
