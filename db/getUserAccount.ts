import { prisma } from "@/db/prisma";

export async function getUserAccount(user_email:string) {
  let dbUser = null
  try
  {
    console.log('trying to find user in db with email: ', user_email);
    dbUser = await prisma.user.findUnique({
      where: {
        email: user_email,
      },
    });
  
    if (dbUser) 
    {
      console.log('user found in db lelole');
    }
  }  
  catch (error) 
  { 
    console.error("Error fetching user:", error); 
  }
  finally {
    return dbUser;
  }
}

export async function isAdminAccount(user_email:string): Promise<boolean>
{
    let dbUser = null
    dbUser = await getUserAccount(user_email);
    if (dbUser) 
    {
        console.log('user found in db lelole');
        if (dbUser.accountType == 'admin')
        {
            console.log("admin user found: {?}", user_email)
            return true;
        }
    }
    return false;
}

export async function getUserTopics(user_email:string): Promise<string[]>
{
  let user = await getUserAccount(user_email);
  if (user)
  {
    console.log(user.interests);
    return user.interests;
  }
  else
  {
    return ["No topics selected for this account!"]
  }
}

export async function updateUserTopics(user_email:string, new_user_topics:string[])
{
  console.log("Updating db...1")
  let user = await getUserAccount(user_email);
  console.log("Updating db...2")
  if (user)
  {
    console.log("Updating db...3")
    console.log("Original: ", user.interests);
    user.interests = new_user_topics;
    console.log("Updating db...4")
    console.log("Updated: ", user.interests);
  }
  else
  {
    console.log("User account not found, cannot update topics!");
  }
  console.log("Updating db...5")
}