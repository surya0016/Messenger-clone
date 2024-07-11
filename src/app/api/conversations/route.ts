import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(
  request: Request
){
  try {
    const currentUser = await getCurrentUser()
    const body = await request.json()
    const { 
      userId,
      isGroup, // if the conversation is group or not
      members, // members of the group
      name     // name of the group
     } = body;

     if (!currentUser?.id || !currentUser?.email){ //to check if the user is signed in , if they are signed in, then they will have an id, so if no id found that means the user is not signed in
      return new NextResponse('Unauthorized', {status:401})
     }

     if (isGroup && (!members || members.length < 2 || !name)){ //to check if it is a group or there are any members or the member length is less than 2 or there is no name for the group
      return new NextResponse('Invalid data', {status:400})
     }

     if(isGroup){
      const newConversation = await prisma.conversation.create({
        data:{
          name, 
          isGroup,
          users:{
            connect:[
              ...members.map((member:{value:string})=>({
                id: member.value
              })),
              {
                id:currentUser.id
              }
            ]
          }
        },
        include:{
          users:true //populate's the user 
        }
      });

      return NextResponse.json(newConversation);
    }
    
    const existingConversations = await prisma.conversation.findMany({
      where:{
        OR:[
          {
            userIds:{
              equals:[currentUser.id, userId]
            }
          },
          {
            userIds:{
              equals:[userId,currentUser.id]
            }
          }
        ]
      }
    })

    const singleConversation = existingConversations[0];
    if(singleConversation){
      return NextResponse.json(singleConversation)
    }

    const newConversation = await prisma.conversation.create({
      data:{
        users:{
          connect:[
            {
              id:currentUser.id
            },
            {
              id:userId
            }
          ]
        }
      },
      include:{
        users:true
      }
    });

    return NextResponse.json(newConversation);
  } catch (error) {
    return new NextResponse('Internal Error', {status:500})
  }
}
