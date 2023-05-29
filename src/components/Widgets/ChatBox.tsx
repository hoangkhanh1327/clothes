import { Badge, Button, Typography } from 'antd'
import { Icon } from '../Generals'
import { useState, useEffect } from 'react'
import ChatContent from './Chatbox/ChatContent'
import ChatInput from './Chatbox/ChatInput'
const { Text } = Typography
const ChatBox = () => {
  const [isBoxChatVisible, toggleBoxChatVisible] = useState(false)

  useEffect(() => {
    window.addEventListener('keydown', handlePressEsc)
    return () => {
      window.removeEventListener('keydown', handlePressEsc)
    }
  }, [])

  const handlePressEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape' || e.keyCode === 27) {
      console.log('e', isBoxChatVisible)
      if (isBoxChatVisible) {
        toggleBoxChatVisible(false)
      }
    }
  }

  if (!isBoxChatVisible) {
    return (
      <Badge
        count={1}
        overflowCount={99}
        className='tw-fixed tw-z-[2147483647] tw-rounded-full tw-bottom-[100px] tw-cursor-pointer tw-h-[35px] tw-w-[35px] tw-bg-primary tw-text-white tw-right-[12px] tw-text-center'
      >
        <div
          className='tw-h-full tw-w-full tw-flex tw-items-center tw-justify-center'
          onClick={() => toggleBoxChatVisible(true)}
        >
          <Icon name='MessageOutlined' className='' style={{ fontSize: '18px' }} />
        </div>
      </Badge>
    )
  } else {
    return (
      <div className='tw-fixed tw-z-[2147483647] tw-rounded-lg tw-shadow-xl tw-overflow-hidden tw-bottom-[100px] tw-right-[12px] tw-h-[500px] tw-w-[310px] tw-bg-white tw-animate-fadeFromRight'>
        <div className='tw-h-full tw-w-full tw-flex tw-flex-col'>
          <header className='tw-p-3 tw-bg-primary tw-text-white tw-relative'>
            <Text className='tw-text-sm tw-text-white tw-font-semibold'>Liên hệ tư vấn</Text>
            <Icon
              name='CloseCircleOutlined'
              className='tw-text-base tw-absolute tw-right-[12px] tw-top-1/2 -tw-translate-y-1/2 tw-cursor-pointer'
              onClick={() => toggleBoxChatVisible(false)}
            />
          </header>
          <div className='tw-flex-1'>
            <ChatContent />
          </div>
          <div className='tw-h-14'>
            <ChatInput />
          </div>
        </div>
      </div>
    )
  }
}

export default ChatBox
