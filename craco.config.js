module.exports = {
    babel: {
        plugins: [
            ["import", {
                "libraryName": "@arco-design/mobile-react",
                "libraryDirectory": "esm", // 注意如果是 SSR 环境，这里需使用 `cjs`
                "style": "css",
            }]
        ]
    }
}