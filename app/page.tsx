import '@/styles/globals.css';
import '@/styles/page_home.css';

import Image from "next/image";
import { SignIn } from '@/components/sign-in';

export default function Home() {
  return (
    <div className="home-page-bg flex-col-centered height-[100vh]">
      <div className="flex-row-centered gap-[2vw] mt-[10vh]">
        <div className="flex-col-centered">
          {/* GEACRE Sign-In Portal Icon Image */}
          <Image
              src="/green-leaf-logo.png"
              alt="GEACRE Sign-in Portal Logo"
              width={100}
              height={100}
          />
        </div>
        <div className="flex-col-centered">
          <h1 className="text-8xl font-normal">Green</h1>
          <h1 className="text-8xl font-light mr-auto">Login</h1>
        </div>
      </div>
      
      <div className="mt-[10vh]">
        {/* Sign-In button */}
        <SignIn/>
      </div>

      <div className="mt-auto">
        {/* Footer */}
        <a className="text-xs" href="https://www.freepik.com/icons/house">Icon by Freepik</a>
      </div>
    </div>
  );
}
