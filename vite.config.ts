import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()] // config para que o vitest entenda o alias de importação do tsconfig.json (@)
})
