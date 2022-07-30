import gulp from "gulp";
import yargs from "yargs";
import gulpSass from "gulp-sass";
import dartSass from "sass";
import cleanCSS from "gulp-clean-css";
import gulpif from "gulp-if";
import sourcemaps from "gulp-sourcemaps";
import webpack from "webpack-stream";
import uglify from "gulp-uglify";
import browserSync from "browser-sync";
import autoprefixer from "autoprefixer";
import postcss from "gulp-postcss";

const server = browserSync.create();
const PRODUCTION = yargs.argv.prod;
const sass = gulpSass(dartSass);

const paths = {  
  styles: {
    src: [
        "scss/style.scss"
    ],
    dest: "css"
  },
  scrips: {
    src: [
     "src/js/app.js"
    ],
    dest: "assets/js"
  },
  other: {
    src: [
      "src/**/*",
      "!src/{images,js,scss,vendors}",
      "!src/{images,js,scss,vendors}/**/*"
    ],
    dest: "dist"
  },
  package: {
    src: [
      "**/*",
      "!.vscode",
      "!node_modules{,/**}",
      "!packaged{,/**}",
      "!src{,/**}",
      "!.babelrc",
      "!.gitignore",
      "!gulpfile.babel.js",
      "!package.json",
      "!package-lock.json"
    ],
    dest: "packaged"
  }
};

export const serve = done => {
  server.init({
    // proxy: "http://localhost:8888/"
    server: {
      baseDir: "./"
  }
  });
  done();
};

export const reload = done => {
  server.reload();
  done();
};

export const styles = () => {
  return gulp.src(paths.styles.src)
    .pipe(gulpif(!PRODUCTION, sourcemaps.init()))
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulpif(PRODUCTION, cleanCSS({ compatibility: "ie8" })))
    .pipe(postcss([ autoprefixer() ]))
    .pipe(gulpif(!PRODUCTION, sourcemaps.write()))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(server.stream());
};

export const watch = () => {
  gulp.watch("scss/**/*.scss", gulp.series(styles));
  // gulp.watch("src/js/**/*.js", gulp.series(scripts, reload));
  gulp.watch("**/*.html", reload);
  gulp.watch("**/*.js", reload);
  // gulp.watch(paths.images.src, gulp.series(images, reload));
  // gulp.watch(paths.other.src, gulp.series(copyOther, reload));
};

// export const copyOther = () => {  
//   return gulp.src(paths.other.src).pipe(gulp.dest(paths.other.dest));  
// };

export const scripts = () => {
  return gulp
    .src(paths.scrips.src)
    .pipe(named())
    .pipe(
      webpack({
        module: {
          rules: [
            {
              test: /\.js$/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: ["@babel/preset-env"]
                }
              }
            }
          ]
        },
        output: {
          filename: "[name].js"
        },
        externals: {
          jquery: "jQuery"
        },
        devtool: !PRODUCTION ? "inline-source-map" : false,
        mode: PRODUCTION ? 'production' : 'development'
      })
    )
    .pipe(gulp.dest(paths.scrips.dest));
};

// export const compress = () => {
//   return gulp
//     .src(paths.package.src)
//     .pipe(
//       gulpif(
//         file => file.relative.split(".").pop() !== "zip",
//         replace("_themename", info.name)
//       )
//     )
//     .pipe(zip(`${info.name}.zip`))
//     .pipe(gulp.dest(paths.package.dest));
// };

export const dev = gulp.series(
  // clean,
  // gulp.parallel(styles, scripts, images, copyOther),
  // replace_filenames,
  styles,
  serve,
  watch
);

// export const build = gulp.series(
//   clean,
//   gulp.parallel(styles, stylesBootstrap, scripts, images, copyOther),
//   copyPlugins,
//   pot
// );
// export const bundle = gulp.series(
//   build,
//   replace_filenames,
//   compress,
//   delete_replaced_filenames
// );

export default dev;