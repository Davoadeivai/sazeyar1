/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_GEMINI_API_KEY: string;
    readonly VITE_API_BASE_URL: string;
    readonly VITE_SITE_NAME: string;
    readonly VITE_SITE_URL: string;
    readonly VITE_MAP_API_KEY: string;
    readonly VITE_MAP_DEFAULT_LAT: string;
    readonly VITE_MAP_DEFAULT_LNG: string;
    readonly VITE_SMS_API_KEY: string;
    readonly VITE_GA_TRACKING_ID: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
