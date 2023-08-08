import { defineConfig } from 'vite'
import glsl from 'vite-plugin-glsl';
import react from '@vitejs/plugin-react'
import {glslify} from 'vite-plugin-glslify';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), glslify()],
})
