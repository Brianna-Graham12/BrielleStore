
/*
    BRIELLE SKINCARE WEBSITE

    File: vite.config.js
    Author: Brianna Graham

    Description:
    Configures React and Vite.

    Netlify's Vite plugin is temporarily
    disabled for local development.
*/

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()]
});
