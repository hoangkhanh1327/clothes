import { useState } from 'react'
import type { Message } from '~/interfaces'

const temp: Message[] = Array(15)
  .fill('')
  .map((_, index) => ({
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, perferendis',
    isUser: index % 2 === 0,
    type: 'text',
    createdAt: new Date(new Date().setDate(new Date().getDate() - index))
  }))

const ChatContent = () => {
  const [message, setMessage] = useState<Message[]>([])

  return <div className='tw-w-full tw-h-full tw-p-3'>Content</div>
}

export default ChatContent
