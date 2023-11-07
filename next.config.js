const isGithubActions = process.env.GITHUB_ACTIONS || false

let assetPrefix = ''
let basePath = '/'

if (isGithubActions) {
    const repo = 'jestinjoshi.github.io';
    assetPrefix = `/${repo}/`
    basePath = `/${repo}`
}

const nextConfig = {
    assetPrefix: `/${repo}/`,
    basePath: `/${repo}`
};

module.exports = nextConfig
