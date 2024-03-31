'use client'

interface CoinWidgetProps {
  title: string
  description?: string
  icon: string
}
export default function CoinWidget(props: CoinWidgetProps) {
  return (
    <div className="w-43vw">
      <div className="p-3">
        <div className="flex-center">
          <div className={`${'props.icon'} text-10`}></div>
          <h3 className="ml-2 text-8 font-black">{props.title}</h3>
        </div>
      </div>
      <div className="w-full bg-black bg-hero-graph-paper-gray-600 py-3 rounded-b-8 relative">
        <div className="i-solar-course-up-linear text-green-600 text-12"></div>
      </div>
    </div>
  )
}
