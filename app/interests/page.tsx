import Layout from "./layout";
import { SignOut } from "@/components/sign-out";
import TopicsList from "@/app/interests/topics";
import { auth } from "@/auth";
import AuthNotFound from "@/db/sessionCheck";
import "@/styles/globals.css";
import * as dbUtils from "@/db/getUserAccount"

{/* List of topics related to sustainability and green living */}
const sus_topics = ["Renewable Energy", "Sustainable Transportation", "Energy Efficiency", "Waste Reduction", "Water Conservation"];

export default async function Interests() {
  const session = await auth();
  if (!session) {
    return (
      <div className="ml-[2vw]">
        <AuthNotFound />
      </div>
    );
  }

  const user_email = session.user?.email;

  let user_topics: string[] = [];

  if (user_email)
  {
    user_topics = await dbUtils.getUserTopics(user_email);
  }

  return (
    <div className="home-page-bg ml-[2vh]">
      <h1 className="page-title">Interests Page</h1>
      <p className="page-caption">
        This is a placeholder for the interests page, where users will be able to select sustainability topics of interest.
      </p>
      <p className="page-caption">Hello, {user_email}!</p>
      <div>
        <SignOut />
      </div>
      <div>
        <p>Your list of interests:</p>
        <div>{user_topics.join(', ')}</div>
      </div>
      <div>{user_email && <TopicsList userEmail={user_email} />}</div>
    </div>
  );
}
