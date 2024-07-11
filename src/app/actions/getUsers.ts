import prisma from '@/app/libs/prismadb';
import getSession from './getSession';

export default async function getUsers(){
  const session = await getSession();

  if(!session?.user?.email){ //this check if the user if logged in or are their any email
    return []
  }

  try {
    const users = await prisma.user.findMany({ //Finding every user in the database
      orderBy:{ //re-ordering the user in descending order by the createdAt property
        createdAt: 'desc',
      },
      where:{
        NOT:{  //We are no including our self so this command
          email:session.user.email
        }
      }
    })

    return users
  
  } catch (error) {
    return []
  }
}

 getUsers;
