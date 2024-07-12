"use client"

interface MessageBoxProps {
  isLast: any
  data: any
}

const MessageBox:React.FC<MessageBoxProps> = ({
  data, isLast
}) => {
  return (
    <div>MessageBox</div>
  )
}

export default MessageBox