import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import tailwind from "@astrojs/tailwind";
import starlightViewModes from "starlight-view-modes";
import starlightObsidian, { obsidianSidebarGroup } from "starlight-obsidian";
import starlightLinksValidator from "starlight-links-validator";
import starlightUtils from "@lorenzo_lewis/starlight-utils";
import starlightOpenAPI, { openAPISidebarGroups } from "starlight-openapi";
import mdx from "@astrojs/mdx";
import starlightBlog from "starlight-blog";
import sentry from "@sentry/astro";
import spotlightjs from "@spotlightjs/astro";
import starlightHeadingBadges from "starlight-heading-badges";
import starlightImageZoom from "starlight-image-zoom";
import starlightThemeRapide from "starlight-theme-rapide";

import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  site: "https://docs.nocaptchaai.com",
  experimental: {
    contentIntellisense: true,
  },
  server: {
    port: 80,
  },
  integrations: [
    starlight({
      title: {
        root: "NoCaptchaAi Docs",
        en: "NoCaptchaAi Docs",
      },
      editLink: {
        baseUrl: "https://github.com/noCaptchaAi/docs/edit/main/content/docs",
      },
      description:
        "Automated CAPTCHA recognition for Awswaf, lemin, reCAPTCHA v2, BLS, mtCaptcha, OCR etc",
      tagline:
        "Automated CAPTCHA recognition for Awswaf, lemin, reCAPTCHA v2, BLS, mtCaptcha, OCR etc",
      logo: {
        light: "/public/logo/logo_dark.png",
        dark: "./public/logo/logo_light.png",
        replacesTitle: false,
      },
      favicon: "./public/logo/logo_light.png",
      defaultLocale: "root",
      locales: {
        root: {
          label: "English",
          lang: "en",
        },
        pt: {
          label: "Portuguese",
          lang: "pt",
        },
      },
      customCss: [
        './src/tailwind.css',
        // Relative path to your custom CSS file
        "./src/styles/custom.css",
        "./src/fonts/font-face.css",
      ],
      plugins: [
        starlightThemeRapide(),
        starlightBlog(),
        starlightHeadingBadges(),
        // starlightOpenAPI([
        //   {
        //     base: "api",
        //     label: "API Schema",
        //     collapsed: true,
        //     schema: "https://raw.githubusercontent.com/openai/openai-openapi/refs/heads/master/openapi.yaml"
        //   },
        // ]),
        starlightUtils({
          multiSidebar: {
            switcherStyle: "horizontalList",
          },
        }),
        starlightLinksValidator(),
        starlightViewModes({
          zenModeEnabled: true,
          zenModeCloseButtonPosition: "top-right",
          zenModeShowHeader: false,
          zenModeShowSidebar: true,
          zenModeShowTableOfContents: true,
          zenModeShowFooter: false,
          zenModeShowSwitchInHeader: true,
          zenModeShowSwitchInHeaderMobile: true,
          zenModeShowSwitchInTableOfContents: false,
          presentationModeEnabled: false, // not supported yet
          presentationModeControlButtonPosition: "bottom-right", // not supported yet
          presentationModeShowSwitchInTableOfContents: false, // not supported yet
        }),
      ],
      sidebar: [
        {
          label: "Official Links",
          items: [
            {
              label: "🌳 Homepage",
              link: "https://nocaptchaai.com",
            },
            {
              label: "🌳 Dashboard",
              link: "https://dash.nocaptchaai.com",
            },
            {
              label: "🍂 Blog",
              link: "/blog",
            },
          ],
        },
        {
          label: "Management",
          autogenerate: { directory: "/account" },
        },
        { label: "Legal", autogenerate: { directory: "/legal" } },
        { label: "Introduction", autogenerate: { directory: "/intro" } },
        // ...openAPISidebarGroups,
        {
          label: "Products",
          autogenerate: { directory: "/guides" },
        },
      ],
      pagination: true,
      lastUpdated: true,
      social: {
        email: "mailto:docs@NoCaptchaai.com",
        github: "https://github.com/withastro/starlight",
        discord: "https://github.com/withastro/starlight",
        telegram: "https://github.com/withastro/starlight",
        twitter: "https://github.com/withastro/starlight",
      },
    }),
    tailwind({
      applyBaseStyles: false,
      configFilePath: "./tailwind.config.mjs",
    }),
    mdx(),
    sentry(),
    spotlightjs(),
    solidJs(),
  ],
});
