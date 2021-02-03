const fs = require('fs');
const packageJson = JSON.parse(fs.readFileSync('./package.json'))
const config = {
    entry: __dirname,
    output: {
        path: __dirname,
        filename: 'README.md'
    },
    filters: ['node_modules'],
    notes: '该文档由脚本自动生成，每次启动项目时均会自动更新，请勿手动修改！',
    join: '--',
    examples: '',
    ...packageJson,
    tree: ''
}

/**
 * 获取当前文件的深度 拼接规则 
 */
const getJoin = (config, level) => {
    if (level == 0) return;
    const { join } = config
    let resultString = '|';
    for (let i = 0; i < level; i++) {
        resultString = resultString + join;
    }
    return resultString;
}

/**
 * 获取所有的目录结构 
 */
const getTree = (config, level = 0) => {
    const { entry, filters, output, main } = config;
    if (!fs.existsSync(entry)) return ''; // 如果当前目录不存在则终止遍历
    const dir = fs.readdirSync(entry);
    if (dir.length == 0) return ''
    const joinString = getJoin(config, level + 1);
    let outputDir = '';
    dir.map(v => {
        outputDir += (joinString + ' ' + v + '\n')
        if (v === main) {
            config.examples = `${fs.readFileSync(entry + '/' + v)}`
        }
        if (v.split('.').length == 1 && !filters.includes(v)) {
            outputDir += getTree({...config, entry: entry + '/' + v }, level + 1)
        }
    });
    return outputDir;
}

config.tree = getTree(config)

const resultTemplate = (config) => {
    const { name, version, description, scripts, author, license, friendly, links, devDependencies, dependencies, notes, examples, tree } = config
    let scriptStr = `
# 📦 安装依赖包
$ npm install / yarn 
`
    Object.keys(scripts).map(v => scriptStr += `
# ${v==='dev'||v==='serve' ? '通过本地服务启动项目': v==='test' ? '打包项目至测试环境': v==='build' ? '打包项目至生产环境': v==='doc'? '自动生成项目文档':''}      
npm run ${v} / yarn ${v}
`)
    let friendlyStr = `## ❤️ 友情提醒`;
    if (friendly) {
        Object.keys(friendly).map(v => friendlyStr += `
#### ${v}      
${friendly[v]}
`)
    }


    let linksStr = `## 🔗 相关文档及线上地址`;
    if (links) {
        Object.keys(links).map(v => linksStr += `
#### [${v}](${links[v]})     
${links[v]}`)
    }


    let devDependenciesStr = "";
    if (devDependencies) {
        Object.keys(devDependencies).map(v => devDependenciesStr += `${v}: ${devDependencies[v]}`)
    }

    let dependenciesStr = "";
    if (dependencies) {
        Object.keys(dependencies).map(v => dependenciesStr += `${v}: ${dependencies[v]}`)
    }
    let doc = `
<img src="https://cs-oss-release.oss-cn-hangzhou.aliyuncs.com/product/20210203/84ce36e306ca4a3b8589aa0c7ca3a56c.png" width="100%"> 
    
# 🎨 ${name}
当前项目版本为${version}

### ✨ 项目简介
${description}
## 🔨 构建步骤
\`\`\`${scriptStr}
\`\`\`
## ⚙️ 项目结构\n\n \`\`\`\n${tree}\`\`\` 
## 🖥 代码示例\n\n \`\`\`\n${examples}
\`\`\` 
## 🌍 模块依赖
#### 开发环境
\`\`\`\n${devDependenciesStr}
\`\`\` 
#### 生产环境
\`\`\`\n${dependenciesStr}
\`\`\` 
${friendlyStr}
${linksStr}
## 🤝 项目成员、版权及注意事项
#### 协作成员 
${author}
#### 版权许可 ${license}
#### 🌈&nbsp;&nbsp;注意事项
${notes}
    `
    return doc
}

/**
 * 向指定位置写入文件文件
 */
const writeFile = (config) => {
    const { output } = config
    const { path, filename } = output;
    const doc = resultTemplate(config)
    fs.writeFile(path + '/' + filename, doc, {}, function(err) {
        if (err) {
            throw err;
        }
    });
}

writeFile(config)
