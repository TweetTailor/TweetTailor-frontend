'use client'

import { useState } from 'react'
import { useActions, useUIState } from 'ai/rsc'
import type { AI } from '../action'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export default function Page() {
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useUIState<typeof AI>()
  const { submitUserMessage } = useActions<typeof AI>()

  async function handleSubmit() {
    // Add user message to UI state
    setMessages(currentMessages => [
      ...currentMessages,
      {
        id: Date.now(),
        display: <div>{inputValue}</div>,
      },
    ])

    // Submit and get response message
    const responseMessage = await submitUserMessage(inputValue)
    setMessages(currentMessages => [
      ...currentMessages,
      responseMessage,
    ])

    setInputValue('')
  }
  return (
    <div className="h-screen w-screen p-4 flex flex-col">
      <div className="border-1 border-b-0 border-border w-full rounded-t-lg flex h-14">
        <div className="border-1 border-border w-10 h-10 my-2 mx-3 rounded-lg center">
          <div className="i-solar-wallet-bold-duotone text-6"></div>
        </div>
        <div className="h-14 w-px bg-border"></div>
        <div className="w-full flex-center px-3">
          <h2 className="font-bold text-xl">Chat</h2>
        </div>
      </div>
      <div className="h-px w-full bg-border"></div>
      <div className="flex-1 flex">
        <div className="w-15 border-x-1 border-b-1 border-border rounded-bl-lg">
          <div className="flex flex-col gap-2 pt-2 items-center">
            <Button variant="ghost" className="w-12 h-12 bg-accent">
              <div className="i-solar-sun-bold-duotone"></div>
            </Button>
            <Button variant="ghost" className="w-12 h-12 bg-accent">
              <div className="i-solar-sun-bold-duotone"></div>
            </Button>
          </div>
        </div>
        <div className="flex-1 border-r-1 border-b-1 border-border rounded-br-lg p-3">
          <div className="bg-accent bg-opacity-50 w-full h-full rounded-lg relative overflow-y-scroll">
            <div className="pb-33">
              {
                // View messages in UI state
                messages.map(message => (
                  <div key={message.id}>
                    {message.display}
                  </div>
                ))
              }
            </div>
            <div className="absolute right-3 top-3">
              <div className="bg-primary px-2 py-1 rounded-full flex-center text-xs text-primary-foreground">
                <div className="i-solar-lightbulb-bolt-bold text-lg mr-1"></div>
                <p>Wallet Agent</p>
              </div>
            </div>
            <div className="absolute bottom-3 w-full">
              <form onSubmit={async (e) => {
                e.preventDefault()
                await handleSubmit()
              }}
              >
                <div className="absolute w-full bottom-0 px-3">
                  <div className="border-1 border-border rounded-lg">

                    <Textarea
                      className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-transparent resize-none min-h-28 pt-3"
                      placeholder="Send a message..."
                      value={inputValue}
                      onChange={(event) => {
                        setInputValue(event.target.value)
                      }}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                          event.preventDefault()
                          event.stopPropagation()
                          handleSubmit()
                        }
                      }}
                    />
                    <div className="flex items-end justify-between w-full bg-white p-3 rounded-lg">
                      <div className="i-solar-paperclip-bold-duotone"></div>
                      <Button type="submit">Submit</Button>
                    </div>

                  </div>
                </div>
              </form>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
