const ejs = require('ejs');

function ViteEjsPlugin(data = {}, ejsOption = {}, beforeRender) {
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
          if (typeof data === 'function') {
            data = data(config);
          }

          if (typeof beforeRender === 'function') {
            data = beforeRender(config);
          }

          html = ejs.render(
            html,
            {
              env: config.env,
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
