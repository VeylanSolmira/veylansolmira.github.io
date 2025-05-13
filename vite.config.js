import { defineConfig } from 'vite'

export default defineConfig({
  // Base public path when served in production
  base: '/',
  
  // Development server configuration
  server: {
    port: 8000,
    open: true
  },
  
  // Build configuration
  build: {
    // Output directory
    outDir: 'dist',
    
    // Generate source maps
    sourcemap: true,
    
    // Minify HTML
    minify: 'terser',
    
    // Rollup options
    rollupOptions: {
      input: {
        main: 'index.html'
      }
    }
  },

  define: {
    'import.meta.env.VITE_GITHUB_REPO_OWNER': JSON.stringify('veylansolmira'),
    'import.meta.env.VITE_GITHUB_REPO_NAME': JSON.stringify('veylansolmira.github.io'),
    'import.meta.env.VITE_USE_LOCAL_CONTENT': JSON.stringify('true')
  }
}) 