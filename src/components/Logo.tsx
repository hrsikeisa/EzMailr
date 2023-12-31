import { EnvelopeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function Logo({
  type,
  justifyContent,
  colorTheme,
  size,
}: {
  justifyContent: string;
  type?: "iconAndText";
  colorTheme?: "light" | "dark";
  size?: "lg";
}) {
  return (
    <Link href="/">
      <div className={`${justifyContent} align-center flex`}>
        <EnvelopeIcon
          width={size === "lg" ? 40 : 30}
          className={`${
            colorTheme === "light" ? "text-white" : "text-blue-600"
          } mr-2`}
        />
        {type === "iconAndText" && (
          <h3
            className={`${
              colorTheme === "light" ? "text-white" : "text-gray-900"
            } tracking-loose mb-0 pb-0 font-bold ${
              size === "lg" ? "text-3xl" : "text-2xl"
            }`}
          >
            EzMailr
          </h3>
        )}
      </div>
    </Link>
  );
}
