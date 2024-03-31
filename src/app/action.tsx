import { OpenAI } from 'openai'
import { createAI, getMutableAIState, render } from 'ai/rsc'
import { z } from 'zod'
import dotenv from 'dotenv'

const env = dotenv.config({ path: '.env.local' }).parsed

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: env?.API_KEY,
  defaultHeaders: {
    'X-Title': 'TweetTailor', // Optional. Shows in rankings on openrouter.ai.
  },
  dangerouslyAllowBrowser: true,
})

// An example of a spinner component. You can also import your own components,
// or 3rd party component libraries.
function Spinner() {
  return <div>Loading...</div>
}

// An example of a flight card component.
function FlightCard({ flightInfo }: { flightInfo: { flightNumber: string, departure: string, arrival: string } }) {
  return (
    <div>
      <h2>Flight Information</h2>
      <p style={{ fontWeight: 'bold', color: 'red' }}>
        Flight Number:
        {flightInfo.flightNumber}
      </p>
      <p>
        Departure:
        {flightInfo.departure}
      </p>
      <p>
        Arrival:
        {flightInfo.arrival}
      </p>

    </div>
  )
}

// An example of a function that fetches flight information from an external API.
async function getFlightInfo(flightNumber: string) {
  return {
    flightNumber,
    departure: 'New York',
    arrival: 'San Francisco',
  }
}

async function submitUserMessage(userInput: string) {
  'use server'

  const aiState: any = getMutableAIState<typeof AI>()

  // Update the AI state with the new user message.
  aiState.update([
    ...aiState.get(),
    {
      role: 'user',
      content: userInput,
    },
  ])

  // The `render()` creates a generated, streamable UI.
  const ui = render({
    model: 'gpt-4-0125-preview',
    provider: openai,
    messages: [
      { role: 'system', content: 'You are a flight assistant' },
      ...aiState.get(),
    ],
    // `text` is called when an AI returns a text response (as opposed to a tool call).
    // Its content is streamed from the LLM, so this function will be called
    // multiple times with `content` being incremental.
    text: ({ content, done }) => {
      // When it's the final content, mark the state as done and ready for the client to access.
      if (done) {
        aiState.done([
          ...aiState.get(),
          {
            role: 'assistant',
            content,
          },
        ])
      }

      return <p className="bg-gray-200 text-white p-3 rounded-lg max-w-55vw">{content}</p>
    },
    tools: {
      get_flight_info: {
        description: 'Get the information for a flight',
        parameters: z.object({
          flightNumber: z.string().describe('the number of the flight'),
        }).required(),
        async *render({ flightNumber }) {
          // Show a spinner on the client while we wait for the response.
          yield <Spinner />

          // Fetch the flight information from an external API.
          const flightInfo = await getFlightInfo(flightNumber)

          // Update the final AI state.
          aiState.done([
            ...aiState.get(),
            {
              role: 'function',
              name: 'get_flight_info',
              // Content can be any string to provide context to the LLM in the rest of the conversation.
              content: JSON.stringify(flightInfo),
            },
          ])

          // Return the flight card to the client.
          return <FlightCard flightInfo={flightInfo} />
        },
      },
    },
  })

  return {
    id: Date.now(),
    display: ui,
  }
}

// Define the initial state of the AI. It can be any JSON object.
const initialAIState: {
  role: 'user' | 'assistant' | 'system' | 'function'
  content: string
  id?: string
  name?: string
}[] = []

// The initial UI state that the client will keep track of, which contains the message IDs and their UI nodes.
const initialUIState: {
  id: number
  display: React.ReactNode
}[] = []

// AI is a provider you wrap your application with so you can access AI and UI state in your components.
export const AI = createAI({
  actions: {
    submitUserMessage,
  },
  // Each state can be any shape of object, but for chat applications
  // it makes sense to have an array of messages. Or you may prefer something like { id: number, messages: Message[] }
  initialUIState,
  initialAIState,
})
