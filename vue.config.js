module.exports = {
    lintOnSave: false,
    css: {
        loaderOptions: {
            scss: {
                prependData: `@import "~@/assets/styles/breakpoints.scss";`
            }
        }
    },
    
}