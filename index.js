const ejs = require('ejs');

function ViteEjsPlugin(data = {}, ejsOption = {}) {
  let config;

  return {
    name: 'vite-plugin-ejs',

    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },

    transformIndexHtml: {
      enforce: 'pre',
      transform(html) {
        try {
          if (typeof data === 'function') data = data(config);

          html = ejs.render(
            html,
            {
              env: config.command,
              command: config.command,
              mode: config.mode,
              NODE_ENV: process.env.NODE_ENV || config.mode,
              ...data,
            },
            ejsOption
          );
        } catch (e) {
          return e.message;
        }

        return html;
      },
    },
  };
}

ViteEjsPlugin.default = ViteEjsPlugin;

module.exports = ViteEjsPlugin;
