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
        main: 'index.html',
        literature: 'literature.html',
        interests: 'interests.html',
        calendar: 'calendar.html',
        content: 'content.html'
      }
    }
  },

  define: {
    'import.meta.env': JSON.stringify({
      VITE_GITHUB_REPO_OWNER: process.env.VITE_GITHUB_REPO_OWNER || 'veylansolmira',
      VITE_GITHUB_REPO_NAME: process.env.VITE_GITHUB_REPO_NAME || 'veylansolmira.github.io',
      VITE_USE_LOCAL_CONTENT: process.env.VITE_USE_LOCAL_CONTENT || 'false'
    })
  }
}) 