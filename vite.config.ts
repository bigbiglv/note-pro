import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Markdown from 'vite-plugin-md'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import hljs from 'highlight.js';
import markdownItAnchor from 'markdown-it-anchor'
import uslug from 'uslug'
/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    vueJsx(),
    Markdown({
      headEnabled: false,
      markdownItOptions: {
        html: false,
        linkify: true,
        breaks: true,
        typographer: true,
        highlight: function (str, lang) {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return `<pre><code class="hljs">${hljs.highlight(lang, str, true).value}</code></pre>`
            } catch (__) {}
          }
      
          return ''
        }
      },
      markdownItSetup(md) {

        const uslugify = s => uslug(s)
        md.use(markdownItAnchor, {slugify: uslugify})
      },
    }),
    UnoCSS(),
  ],
  resolve: {
    alias: {
      '@': './src',
      '@notes': './public/notes',
    },
    extensions: ['.ts', '.tsx']
  },
})
