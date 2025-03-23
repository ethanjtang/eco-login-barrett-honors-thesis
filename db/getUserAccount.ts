import { prisma } from "@/db/prisma";

export async function getUserAccount(user_email:string) {
  let dbUser = null
  try
  {
    console.log('Searching for user in DB with email: ', user_email);
    dbUser = await prisma.user.findUnique({
      where: {
        email: user_email,
      },
    });
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
        console.log('User account found in database: ', user_email);
        if (dbUser.accountType == 'admin')
        {
            console.log("Admin user detected: {?}", user_email)
            return true;
        }
    }
    return false;
}

export async function isSuperAccount(user_email:string): Promise<boolean>
{
    let dbUser = null
    dbUser = await getUserAccount(user_email);
    if (dbUser) 
    {
        console.log('User account found in database: ', user_email);
        if (dbUser.accountType == 'super')
        {
            console.log("Super user detected: {?}", user_email);
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
  console.log("Starting user topics update for {?}", user_email);
  let user = await getUserAccount(user_email);
  if (user)
  {
    console.log("Original topics for {?}: {?}", user_email, user.interests);
    user.interests = new_user_topics;
    console.log("Updated: ", user.interests);
  }
  else
  {
    console.log("User account not found, cannot update topics!");
  }
  console.log("Finished topics update for {?}", user_email);
}