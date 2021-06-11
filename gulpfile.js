const gulp = require("gulp"),
  del = require("del"),
  extender = require("gulp-html-extend"),
  babel = require("gulp-babel"),
  gulpUglify = require("gulp-uglify"),
  rename = require("gulp-rename"),
  concat = require("gulp-concat"),
  // htmlmin = require('gulp-htmlmin'),
  replace = require("gulp-replace");

// * ==========================================================================
// * 每個 Gulp Plugins 的設定
// * ==========================================================================

const PROCESS = {
  extender: {
    annotations: false,
    verbose: false,
  },
  htmlmin: {
    removeComments: true,
    collapseWhitespace: true,
  },
  babel: {
    presets: [
      [
        "env",
        {
          loose: true,
          modules: false,
        },
      ],
    ],
  },
};

// * ==========================================================================
// * 刪除 dist 資料夾
// * ==========================================================================

function clean() {
  return del("./dist");
}

// * ==========================================================================
// * 1. 找到 ch/assets/ 裡面除了 page-1.html 以外的所有 html 檔案，執行 extender
// *    接著把 HTML 裡面的字串 "./page-1.html" 替換成 "../index.html"，並輸出至 ./dist/ch 資料夾
// * 2. 找到 ch/assets/page-1.html 這隻檔案，執行 extender
// *    接著把裡面的字串 "./page-1.html" 替換成 "./index.html"、"./sitemap.html" 替換成 "./ch/sitemap.html"、"./page-" 替換成 "./ch/page-"
// *    然後重新命名成 index.html，輸出至 ./dist 資料夾
// * ==========================================================================

gulp.task("extend",  function() {
  return gulp.src("./assets/*.html").pipe(extender(PROCESS.extender)).pipe(gulp.dest("./dist"))
});

// * ==========================================================================
// * 所有的 JavaScript Plugins
// * ==========================================================================

const JS_PLUGINS = [
  "./common/js/plugins/jquery-3.2.1.min.js",
  "./common/js/plugins/lazysizes.min.js",
  // "./common/js/plugins/lightgallery-all.min.js",
  // "./common/js/plugins/footable.js",
  // "./common/js/plugins/swiper.min.js",
  "./common/js/plugins/jquery.mCustomScrollbar.min.js",
  "./common/js/plugins/gsap.min.js",
  "./common/js/main.js",
];

// * ==========================================================================
// * 把所有 JavaScript 檔案壓縮、醜化、合併
// * ==========================================================================

gulp.task("bundle", function () {
  return gulp
    .src(JS_PLUGINS)
    .pipe(babel(PROCESS.babel))
    .pipe(gulpUglify())
    .pipe(concat("main.js"))
    .pipe(gulp.dest("./dist/common/js"));
});

// * ==========================================================================
// * 移動 css、images 檔案到 dist 資料夾
// * ==========================================================================

gulp.task("copy", function () {
  return (
    gulp.src("./common/css/**").pipe(gulp.dest("./dist/common/css")),
    gulp.src("./common/images/**").pipe(gulp.dest("./dist/common/images"))
  );
});

// * ==========================================================================
// * Default
// * ==========================================================================

gulp.task(
  "default",
  gulp.series(clean, gulp.parallel(["extend", "bundle", "copy"]))
);
