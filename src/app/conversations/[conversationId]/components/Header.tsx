'use client'

import Avatar from '@/app/components/Avatar'
import useOtherUser from '@/app/hooks/useOtherUser'
import { Conversation, User } from '@prisma/client'

interface HeaderProps {
  conversation: Conversation & {
    users: User[]
  }
}

const Header:React.FC<HeaderProps> = ({
  conversation
}) => {
  const otherUser = useOtherUser(conversation)

  return (
    <div className='p-4 border-b'>
      <Avatar user={otherUser}/>
    </div>
  )
}

export default Header