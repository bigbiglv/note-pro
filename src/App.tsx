import { defineComponent } from 'vue'
import Layout from './layout/index'

export default defineComponent({
  name: 'App',
  setup() {
    return () => (
      <Layout />
    )
  },
})
