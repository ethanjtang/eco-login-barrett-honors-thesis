// signOut.tsx
import { handleSignOut } from "@/components/signOutServer";

export function SignOut() {
  return (
    <form
      action={handleSignOut}
    >
      <button
        className="@apply bg-greenify-button-green rounded-full shadow-sm border border-solid border-black/[.16] transition-colors flex items-center justify-center text-white text-3xl h-18 w-35 px-6 py-3 hover:bg-coffee-green;"
        type="submit"
      >
        Sign Out
      </button>
    </form>
  );
}

export function SignOut_Sm() {
  return (
    <form
      action={handleSignOut}
    >
      <button
        className="@apply bg-greenify-button-green rounded-full shadow-sm border border-solid border-black/[.16] transition-colors flex items-center justify-center text-white text-xl h-10 w-18 px-4 py-2 hover:bg-coffee-green"
        type="submit"
      >
        Sign Out
      </button>
    </form>
  );
}

