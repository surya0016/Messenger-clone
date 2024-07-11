import { useParams } from "next/navigation";
import { useMemo } from "react";

//This hook is to check if the conversation is going or not to perform some 
//action based on the boolean isOpen

const useConversation = () => {
  const params = useParams();

  const conversationId = useMemo(()=>{
    if(!params?.conversationId){
      return '';
    }
    return params.conversationId as string;
  },[params?.conversationId])

  const isOpen = useMemo(()=> !!conversationId, [conversationId]);

  return useMemo(()=>({
    isOpen,
    conversationId
  }),[isOpen, conversationId])
}

export default useConversation;