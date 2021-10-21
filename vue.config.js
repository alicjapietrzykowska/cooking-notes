module.exports = {
    lintOnSave: false,
    publicPath: process.env.NODE_ENV === 'production'
    ? '/cooking-notes/'
    : '/',
    css: {
        loaderOptions: {
            scss: {
                prependData: `@import "~@/assets/styles/breakpoints.scss";`
            }
        }
    },
    
}