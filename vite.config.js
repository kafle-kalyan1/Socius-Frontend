import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

const manifestForPlugin =     {

  manifest: {
    theme_color: "#171717",
		background_color: "#e8ebf2",
		display: "standalone",
		scope: ".",
		start_url: "/",
    short_name: "Socius",
  icons: [
      {
          src: "Favicons/iPhone.png",
          sizes: "192x192",
          type: "image/png"
      },
  ],
},
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VitePWA(manifestForPlugin),
    react(),
  ],
  server: {
    proxy: {
      "/api": {
        target: "https://socius.onrender.com",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace("/api", ""),
      },
    },
  },
  build: {
    proxy: {
      "/api": {
        target: "https://socius.onrender.com/", 
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace("/api", ""),
      }
    }
  }
});
