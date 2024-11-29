import '@/styles/globals.css'
import '@/styles/page_home.css'

import { SignIn } from '@/components/sign-in'

export default function Home() {
  return (
    <div className="home-page-bg">
      <div className="flex-col-centered">
        <SignIn />
        <p className="mt-10"> lolole </p>
      </div>
    </div>
  );
}
