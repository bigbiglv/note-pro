import { defineComponent } from 'vue'
import Layout from './layout'

export default defineComponent({
  name: 'App',
  setup() {
    return () => (
      <Layout />
    )
  },
})
