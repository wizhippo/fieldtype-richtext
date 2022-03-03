const Encore = require('@symfony/webpack-encore');
const path = require('path');
const { styles } = require(path.resolve('./public/bundles/ibexaadminuiassets/vendors/@ckeditor/ckeditor5-dev-utils'));

Encore.reset();
Encore.setOutputPath('public/assets/richtext/build')
    .setPublicPath('/assets/richtext/build')
    .enableSassLoader()
    .disableSingleRuntimeChunk();

Encore.addEntry('ibexa-richtext-onlineeditor-js', [path.resolve(__dirname, '../public/js/CKEditor/core/base-ckeditor.js')]).addStyleEntry(
    'ibexa-richtext-onlineeditor-css',
    [path.resolve(__dirname, '../public/scss/ckeditor.scss')]
);

Encore.addAliases({
    '@ckeditor': path.resolve('./public/bundles/ibexaadminuiassets/vendors/@ckeditor'),
});

const customConfig = Encore.getWebpackConfig();

customConfig.name = 'richtext';

customConfig.module.rules[4].oneOf[1].use[1].options.url = false;
customConfig.module.rules[1].oneOf[1].use[1].options.url = false;

customConfig.module.rules.push({
    test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
    use: ['raw-loader'],
});

customConfig.module.rules.push({
    test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
    use: [
        {
            loader: 'style-loader',
            options: {
                injectType: 'singletonStyleTag',
                attributes: {
                    'data-cke': true,
                },
            },
        },
        {
            loader: 'postcss-loader',
            options: styles.getPostCssConfig({
                themeImporter: {
                    themePath: require.resolve(path.resolve('./public/bundles/ibexaadminuiassets/vendors/@ckeditor/ckeditor5-theme-lark')),
                },
                minify: true,
            }),
        },
    ],
});

customConfig.module.rules[1] = {};
customConfig.module.rules[2] = {};

module.exports = customConfig;
