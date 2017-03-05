// Dependencies:
const fs = require('fs');
const remark = require('remark');
const html = require('remark-html');
const premark = require('./index.js');

// Process:
const example = fs.readFileSync('example.md', 'utf-8');
const result = remark().use(premark).use(html).processSync(example);

// Result:
console.log(result.contents);
