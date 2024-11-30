import Link from "next/link";

export function Register() {
  return (
    <Link
        href="/register"
        className="@apply bg-greenify-button-green rounded-full shadow-sm border border-solid border-black/[.16] transition-colors flex items-center justify-center text-white text-3xl h-18 w-35 px-6 py-3 hover:bg-coffee-green;"
        >
        Register
    </Link>
  );
}
