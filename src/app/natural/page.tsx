'use client'

import React, { useEffect, useState } from 'react'
import { Lumiflex, Novatrix, Zenitho } from 'uvcanvas'
import { useLocalStorage } from 'foxact/use-local-storage'
import { motion, useScroll } from 'framer-motion'
import GridLayout from '@/components/GridLayout'
import GridItem from '@/components/GridItem'
import CoinWidget from '@/components/CoinWidget'

interface CoinWidgetData {
  title: string
  description?: string
  icon: string
}

export default function Page() {
  const { scrollYProgress } = useScroll()
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setScrollY(window.scrollY)
    })
  }, [])

  const [value, setValue] = useLocalStorage<CoinWidgetData[]>(
    /** The localStorage key */
    'coin-data',
    /**
     * The initial value to use if there is no item in the local storage with the provided key,
     * the undefined value will be used if no initial value is provided.
     *
     * Also, the initial value will also be used during the server-side rendering, see below.
     */
    Array.from({ length: 10 }, (_, index) => {
      return {
        title: `Coin ${index + 1}`,
        icon: 'i-solar-course-up-linear',
      }
    }),
    /**
     * Optional configuration object enables the customization of value serialization before it's stored in local storage.
     */
    {
      // Optional, default to false. When set to "true", the value will be passed to the localStorage API as is.
      raw: false,
      // Optional, default to "JSON.stringify". Can only be specified when the "raw" is set to false (which is the default).
      serializer: JSON.stringify,
      // Optional, default to "JSON.parse". Can only be specified when the "raw" is set to false (which is the default).
      deserializer: JSON.parse,
    },
  )

  const items = value?.map((item, index) => (
    <GridItem
      key={index}
      handle={true}
      id={`${index}`}
      value={`Item ${index + 1}`}
    >
      <CoinWidget title={item.title} icon="i-solar-course-up-linear" />
    </GridItem>
  )) ?? []

  const [isExpanded, setIsExpanded] = useState(false)
  return (
    <div className="h-200vh w-screen scrollbar-hide">
      <div className={`transition-all ${scrollY > 300 ? 'opacity-0' : 'opacity-100'} fixed top-4 left-0 z-88 flex-col-center w-full px-8`}>
        {[0, 0.1, 0.2].map((item, index) => (
          <div onClick={() => setIsExpanded(!isExpanded)} style={{ scale: `${isExpanded ? 1 : 1 - item} 1`, transform: `translate(0 ,-${isExpanded ? 0 : item * 600}px)`, zIndex: (1 - index) * 10 }} className={`transform transition-all w-full rounded-lg shadow bg-white p-4 ${isExpanded ? 'mb-2' : 'mb-0'}`}>
            <div className={`${item === 0 ? 'opacity-100' : 'opacity-0'} flex-center`}>
              <div className="i-cryptocurrency-sol bg-gradient-to-b from-cyan-600 to-purple-600 text-6"></div>
              <h3 className="ml-2 text-8 font-black">Solana</h3>
              <p>{scrollY}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="fixed top-0 left-0 h-screen w-screen flex flex-col justify-between z-2 backdrop-blur-2xl bg-white bg-opacity-60">
        <div></div>

        <motion.div
          style={{
            height: (300 + scrollY * 0.8), // 这里可以调整高度变化的速率
          }}
          className="min-h-300px max-h-90vh w-full rounded-t-8 bg-gradient-to-b from-white from-opacity-60 z-3 p-3"
        >
          <div className={`w-16 ${scrollY > 300 ? 'h-1 mb-4' : 'h-0 mb-2'} transition-all bg-black bg-op-10 rounded-full mx-auto`}></div>

          <GridLayout items={items}>

          </GridLayout>
        </motion.div>
      </div>
      <div className="fixed top-0 left-0 h-screen w-screen">
        {/* @ts-expect-error style attributes */}
        <Novatrix style={{ width: '100%', height: '100%' }} />

      </div>

    </div>
  )
}
