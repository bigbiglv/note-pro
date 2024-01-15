import { defineConfig, presetWebFonts, presetIcons, presetMini, presetAttributify } from 'unocss'
export default defineConfig({
  presets: [
    // 基础样式预设
    presetMini({
      theme: {
        colors: {
          primary: '', // class="text-primary bg-primary"
        }
      }
    }), 
    // 或者 atomic 预设等
    // presetAtomic(),
    presetAttributify(),
    presetWebFonts(),
    presetIcons({ /* options */ }),
  ],
})