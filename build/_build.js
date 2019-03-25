(() => {
    "use strict";

    /* global func, path */
    global.build = new function () {

        /**
         * Removes the content of the dist directory
         *
         * @returns {Promise}
         */
        const clean = () => {
            return new Promise((resolve) => {
                func.remove([path.dist + "*"]).then(() => {
                    resolve();
                });
            });
        };

        /**
         * Parses the scss files and copies the css files to the dist directory
         *
         * @returns {Promise}
         */
        const css = () => {
            return new Promise((resolve) => {
                func.minify([ // parse scss files
                    path.src + "scss/*.scss"
                ], path.dist + "css/").then(() => {
                    resolve();
                });
            });
        };

        /**
         * Copies the images to the dist directory
         *
         * @returns {Promise}
         */
        const img = () => {
            return new Promise((resolve) => {
                func.copy([path.src + "img/**/*"], [path.src + "**/*.xcf"], path.dist, false).then(() => {
                    resolve();
                });
            });
        };

        /**
         * Parses the js files and copies them to the dist directory
         *
         * @returns {Promise}
         */
        const js = () => {
            return new Promise((resolve) => {
                func.minify([
                    path.src + "js/*.js"
                ], path.dist + "js/").then(() => {
                    resolve();
                });
            });
        };

        /**
         *
         */
        this.release = () => {
            return new Promise((resolve) => {
                clean().then(() => {
                    return Promise.all([js(), css(), img()]);
                }).then(() => {
                    resolve();
                });
            });
        };
    };
})();