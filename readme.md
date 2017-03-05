# premark

Create slides with remark.

## Usage

Dependencies:

```javascript
const fs = require('fs');
const remark = require('remark');
const html = require('remark-html');
const premark = require('premark');
```

Process:

```javascript
const example = fs.readFileSync('example.md', 'utf-8');
const result = remark().use(premark).use(html).processSync(example);
```

Result:

```
<section class="slide"><h1>Example Title</h1><h2>Slide 1</h2><p>content</p></section>
<section class="slide"><h2>Slide 2</h2><p>content</p></section>
```
