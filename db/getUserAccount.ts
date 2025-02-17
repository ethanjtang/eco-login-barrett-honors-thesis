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
      if (dbUser && dbUser.accountType == 'admin')
      {
        console.log("admin user found: {?}", user_email)
      }
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
            if (dbUser.accountType == 'admin')
            {
                console.log("admin user found: {?}", user_email)
                return true;
            }
        }
        return false;
    }  
    catch (error) 
    { 
        console.error("Error fetching user:", error);
        return false;
    }
}