import { signIn } from "@/auth";
 
export function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("", { redirectTo: '/interests' });
      }}
    >
      <button className = "@apply bg-greenify-button-green rounded-full shadow-sm border border-solid border-black/[.16] transition-colors flex items-center justify-center text-white text-3xl h-18 w-35 px-6 py-3 hover:bg-coffee-green;"
              type="submit">
        Sign In
      </button>
    </form>
  )
}

export function SignIn_Sm() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("", { redirectTo: '/interests' });
      }}
    >
      <button className = "@apply bg-greenify-button-green rounded-full shadow-sm border border-solid border-black/[.16] transition-colors flex items-center justify-center text-white text-2xl h-15 w-25 px-6 py-3 hover:bg-coffee-green;"
              type="submit">
        Sign In
      </button>
    </form>
  )
}