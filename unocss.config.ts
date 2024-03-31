// unocss.config.ts
import { defineConfig, presetIcons, presetUno } from 'unocss'
import presetAnimations from 'unocss-preset-animations'
import { presetShadcn } from 'unocss-preset-shadcn'
import { presetHeroPatterns } from '@julr/unocss-preset-heropatterns'
import { presetScrollbar } from 'unocss-preset-scrollbar'
import { presetScrollbarHide } from 'unocss-preset-scrollbar-hide'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons(),
    presetHeroPatterns(),
    presetScrollbar(),
    presetScrollbarHide(),
    presetAnimations(),
    presetShadcn({
      color: 'zinc',
    }),
  ],
  shortcuts: {
    'center': 'flex justify-center items-center',
    'flex-center': 'flex items-center',
    'flex-col-center': 'flex-center flex-col',
    'flex-row-center': 'flex-center flex-row',
    'flex-row-between': 'flex-row-center justify-between',
    'flex-col-between': 'flex-col-center justify-between',
  },
  // By default, `.ts` and `.js` files are NOT extracted.
  // If you want to extract them, use the following configuration.
  // It's necessary to add the following configuration if you use shadcn-vue or shadcn-svelte.
  content: {
    pipeline: {
      include: [
        // the default
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        // include js/ts files
        'src/**/*.{js,ts}',
      ],
    },
  },
})
