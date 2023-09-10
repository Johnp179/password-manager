import Link from "next/link";

export default function Footer({
  pathname,
}: {
  pathname: "/register" | "/signin";
}) {
  return (
    <div>
      Already have an account?{" "}
      <Link
        className="underline hover:text-blue-300"
        href={pathname === "/register" ? "/signin" : "/register"}
      >
        {pathname === "/register" ? "Login" : "Register"}
      </Link>{" "}
      here.
    </div>
  );
}
