import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.everbeer.app',
  appName: 'everbeer',
  webDir: 'dist/everbeer',
  server: {
    androidScheme: 'https',
  },
};

export default config;
