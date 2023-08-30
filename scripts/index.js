import { existsSync, readFileSync, writeFileSync, mkdirSync } from "fs";
import mainPackage from "../package.json";
import crypto from "crypto";
import axios from "axios";

const isProduction = process.env.NODE_ENV === "production";

// cdn前缀
const protocol = "https";
const cdnPrefix = "cdn.superting.cn";

// 公共依赖
const mainDependenciesObj = mainPackage.dependencies || {};
const mainAppName = mainPackage.name || "";

// 获取子仓库依赖信息
const subApplicationDir = process.env.PWD;
const subPackageJsonPath = `${subApplicationDir}/package.json`;
const subPackageJson = existsSync(subPackageJsonPath)
  ? readFileSync(subPackageJsonPath, { encoding: "utf8", flag: "r" })
  : {};
const subPackage = JSON.parse(subPackageJson);
const subDependenciesObj = subPackage?.dependencies || {};
const subAppName = subPackage?.name || "";

export const externalsObj = {
  vue: "Vue",
  "vue-router": "VueRouter",
  "wujie-vue3": "WujieVue",
};

const suffixMap = new Map([
  ['vue', '/dist/vue.global.min.js'],
  ['vue-router', '/dist/vue-router.global.min.js'],
  ['wujie-vue3', '/lib/index.min.js'],
])

const hash = crypto.createHash("md5");

const externalsStr = Object.keys(externalsObj)
  .map((dependency) => {
    const version =
      dependency in subDependenciesObj
        ? subDependenciesObj[dependency]
        : mainDependenciesObj[dependency];
    return version ? `npm/${dependency}@${version}${suffixMap.get(dependency) || ''}` : null;
  })
  .filter((dependency) => !!dependency)
  .join(",");

hash.update(externalsStr);
const md5 = hash.digest("hex").slice(0, 8);

const cdnPath = `${protocol}://${cdnPrefix}/${mainAppName}/${subAppName}/resource-${md5}.js`;
export const externalsScript =
  externalsStr && process.env.NODE_ENV === "production"
    ? `<script src='${cdnPath}'></script>`
    : "";

// 生成env.config.js配置
let envMD5 = "";
const envPath = `${subApplicationDir}/public/env.config.js`;
if (isProduction && existsSync(envPath)) {
    const envHash = crypto.createHash("md5");
    envHash.update(
      readFileSync(subPackageJsonPath, { encoding: "utf8", flag: "r" })
    );
    const md5 = envHash.digest("hex").slice(0, 8);
    envMD5 = md5;
}
export { envMD5 };

// combine方案
if (externalsStr && isProduction) {
  try {
    const res = await axios.head(cdnPath);
    if (res.status !== 200) throw new Error("资源不存在");
  } catch (e) {
    const downloadUrl = `https://cdn.jsdelivr.net/combine/${externalsStr}`;
    console.log(`Downloading Resource ==> ${downloadUrl}`);
    const resources = await axios
      .get(downloadUrl)
      .then((response) => response.data);

    const resourceDir = `${subApplicationDir}/cdn`;
    if (!existsSync(resourceDir)) {
      mkdirSync(resourceDir, { recursive: true });
    }
    writeFileSync(`${resourceDir}/resource-${md5}.js`, resources);
    console.log("Resources download finished, Start to build...");
  }
}
