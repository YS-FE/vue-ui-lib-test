'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')


var md = require('markdown-it')();
var CopyWebpackPlugin = require('copy-webpack-plugin');
var striptags = require('./strip-tags');
var slugify = require('transliteration').slugify;


var wrap = function(render) {
  return function() {
    return render.apply(this, arguments)
      .replace('<code v-pre class="', '<code class="hljs ')
      .replace('<code>', '<code class="hljs">');
  };
};


function convert(str) {
  str = str.replace(/(&#x)(\w{4});/gi, function($0) {
    return String.fromCharCode(parseInt(encodeURIComponent($0).replace(/(%26%23x)(\w{4})(%3B)/g, '$2'), 16));
  });
  return str;
}

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}



module.exports = {
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [{
        test: /\.md$/,
        loader: 'vue-markdown-loader',
        options: {
          preprocess: (MarkdownIt, source) => {
            MarkdownIt.renderer.rules.table_open = function() {
              return '<table class="table">'
            }
            MarkdownIt.renderer.rules.fence = wrap(MarkdownIt.renderer.rules.fence)
            return source
          },
          use: [
            [require('markdown-it-container'), 'demo', {
              // 用于校验包含demo的代码块
              validate: params => params.trim().match(/^demo\s*(.*)$/),
              render: function(tokens, idx) {
                var m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
                if (tokens[idx].nesting === 1) {
                  var description = (m && m.length > 1) ? m[1] : '';
                  var content = tokens[idx + 1].content;
                  var html = convert(striptags.strip(content, ['script', 'style'])).replace(/(<[^>]*)=""(?=.*>)/g, '$1');
                  var script = striptags.fetch(content, 'script');
                  var style = striptags.fetch(content, 'style');

                  var descriptionHTML = description ?
                    md.render(description) :
                    '';

                  return `<demo-block>
                        <div slot="desc">${html}</div>
                        <div slot="highlight">`;
                }
                return '</div></demo-block>\n';
              }
            }]
          ]
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('packages'), resolve('examples'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
