const del = require("del");

const gulp = require("gulp");
const gulpDebug = require("gulp-debug");
const gulpTypescript = require("gulp-typescript");
const gulpSourcemaps = require("gulp-sourcemaps");

const webpack = require("webpack");
const webpackStream = require("webpack-stream");

const tsProject = gulpTypescript.createProject("tsconfig.json");


const clean = cb => {
    del([
        "dist/**",
        "build/**"
    ]);
    cb();
}

const compile = cb => {
    gulp.src(["src/**/*.{ts,js}", "!/src/client/**/*.*"])
        .pipe(gulpSourcemaps.init())
        .pipe(tsProject())
        .pipe(gulpSourcemaps.write("."))
        .pipe(gulp.dest("build"))
        .pipe(gulpDebug({title: "Serverside TS"}));
    cb();
}

const dist = cb => {
    gulp.src("src/client/index.ts")
        .pipe(webpackStream(require("./webpack.config"), webpack))
        .pipe(gulp.dest("dist"))
        .pipe(gulpDebug({title: "Webpack"}));
    cb();
}

const build = gulp.series(clean, compile, dist);

gulp.task("clean", clean);
gulp.task("compile", compile);
gulp.task("dist", dist);

gulp.task("build", build);