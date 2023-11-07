const isGithubActions = process.env.GITHUB_ACTIONS || false

let assetPrefix = ''
let basePath = ''

if (isGithubActions) {
    const repo = 'jestinjoshi.github.io';
    assetPrefix = `/${repo}/`
    basePath = `/${repo}`
}

const nextConfig = {
    output: 'export',
    assetPrefix: assetPrefix,
    basePath: basePath
};

module.exports = nextConfig
