const iconPath = './images/icon';

module.exports = {
    packagerConfig: {
      icon: iconPath
    },
    rebuildConfig: {},
    makers: [
      {
        name: '@electron-forge/maker-squirrel',
      },
      {
        name: '@electron-forge/maker-dmg',
      },
      {
        name: '@electron-forge/maker-zip',
      },
      {
        name: '@electron-forge/maker-deb',
      },
      // {
      //   name: '@electron-forge/maker-rpm',
      //   config: {},
      // },
    ],
    plugins: [
      {
        name: '@electron-forge/plugin-webpack',
        config: {
          devContentSecurityPolicy:"default-src * self blob: data: gap:; style-src * self 'unsafe-inline' blob: data: gap:; script-src * 'self' 'unsafe-eval' 'unsafe-inline' blob: data: gap:; object-src * 'self' blob: data: gap:; img-src * self 'unsafe-inline' blob: data: gap:; connect-src self * 'unsafe-inline' blob: data: gap:; frame-src * self blob: data: gap:;",
          mainConfig: './webpack.main.config.js',
          renderer: {
            config: './webpack.renderer.config.js',
            entryPoints: [
              {
                html: './src/index.html',
                js: './src/renderer.js',
                name: 'main_window',
                preload: {
                  js: './src/preload.js',
                },
              },
            ],
          },
        },
      },
    ],
  };
  