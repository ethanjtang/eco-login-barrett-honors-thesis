import '@/styles/globals.css';
import '@/styles/page_home.css';

import Image from "next/image";
import { SignIn } from '@/components/sign-in';

export default function Home() {
  return (
    <div className="home-page-bg flex-col-centered gap-[2vh]">
      <div className="flex-row-centered gap-[1vw]">
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
          <h1 className="text-5xl font-jost font-semibold">Green</h1>
          <h1 className="text-5xl font-jost mr-auto">Living</h1>
        </div>
      </div>

      {/* Sign-In button */}
      <SignIn/>
      
    </div>
  );
}
