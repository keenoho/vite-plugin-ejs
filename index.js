import ejs from 'ejs';

function ViteEjsPlugin(data = {}, ejsOption = {}) {
  let config;

  return {
    name: 'vite-plugin-ejs',

    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },

    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        try {
          let _data = {
            env: config.env,
            command: config.command,
            mode: config.mode,
            NODE_ENV: process.env.NODE_ENV || config.mode,
            ...data,
          };

          if (typeof data === 'function') {
            const extra = data(config);
            _data = {
              ..._data,
              ...extra,
            };
          }

          html = ejs.render(html, _data, ejsOption);
        } catch (e) {
          return e.message;
        }

        return html;
      },
    },
  };
}

export default ViteEjsPlugin;
