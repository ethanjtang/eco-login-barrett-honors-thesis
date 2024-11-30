
import { signOut } from "@/auth"
 
export async function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: '/' });
      }}
    >
      <button className="@apply bg-greenify-button-green rounded-full shadow-sm border border-solid border-black/[.16] transition-colors flex items-center justify-center text-white text-2xl h-15 w-25 px-6 py-3 hover:bg-coffee-green;"
              type="submit">
        Sign Out
      </button>
    </form>
  )
}