import legacy from "@vitejs/plugin-legacy";
import fs from "fs";
import glob from "glob";
import { resolve } from "path";
import { webfontDownload } from "vite-plugin-webfont-dl";
import pretty from "pretty";
import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";
import viteImagemin from "vite-plugin-imagemin";

export default defineConfig({
  assetsInclude: ["*.html"],
  base: "/",
  build: {
    cssCodeSplit: false,
    emptyOutDir: true,
    minify: false,
    outDir: "./../dist",
    rollupOptions: {
      input: {
        main: new URL("./src/index.html", import.meta.url).pathname,
      },
      output: {
        assetFileNames: "assets/[name].[ext]",
        chunkFileNames: "assets/[name].js",
        entryFileNames: "assets/[name].js",
        manualChunks: undefined,
      },
    },
  },
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, "./src/partials"),
    }),
    legacy({
      targets: ["> 0.2%", "not dead", "not ie <= 11", "not op_mini all"],
      renderLegacyChunks: false,
    }),
    viteImagemin({
      verbose: true,
      gifsicle: {
        optimizationLevel: 1,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 1,
      },
      mozjpeg: {
        quality: 70,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 6,
      },
      svgo: {
        plugins: [
          {
            name: "removeViewBox",
          },
          {
            name: "removeEmptyAttrs",
            active: false,
          },
        ],
      },
      webp: {
        lossless: false,
        metadata: "none",
        method: 6,
        preset: "default",
        quality: 70,
      },
    }),
    webfontDownload([], {
      injectAsStyleTag: false,
    }),
    {
      name: "vite-plugin-additional-reload",
      enforce: "post",
      handleHotUpdate({ file, server }) {
        if (file.endsWith(".hbs")) {
          server.ws.send({
            type: "full-reload",
            path: "*",
          });
        }
      },
    },
    {
      name: "vite-plugin-pretty-js",
      transformIndexHtml: {
        enforce: "post",
        transform: (html) => {
          return pretty(html).replaceAll("\n\n", "\n");
        },
      },
    },
    {
      name: "fix-path",
      closeBundle: () => {
        glob(__dirname + "/dist/*.html", (err, files) => {
          for (let i = 0; i < files.length; i++) {
            const filePath = files[i];

            fs.writeFileSync(
              filePath,
              fs
                .readFileSync(filePath)
                .toString()
                .replaceAll(`href="/assets/`, `href="./assets/`)
                .replaceAll(`src="/assets/`, `src="./assets/`)
                .replaceAll(
                  `.css\"`,
                  `.css?hash=` + Math.random().toString().substring(2, 16) + `"`
                )
                .replaceAll(
                  `.js\"`,
                  `.js?hash=` + Math.random().toString().substring(2, 16) + `"`
                )
            );
          }
        });

        glob(__dirname + "/dist/assets/*.css", (err, files) => {
          for (let i = 0; i < files.length; i++) {
            const filePath = files[i];

            fs.writeFileSync(
              filePath,
              fs
                .readFileSync(filePath)
                .toString()
                .replaceAll(`url(/assets/`, `url(./`)
            );
          }
        });
      },
    },
  ],
  publicDir: "./../public",
  root: "./src",
  server: {
    host: "0.0.0.0",
    port: 1102,
  },
});
