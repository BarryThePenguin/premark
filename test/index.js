const test = require('tape');

const fs = require('fs');
const path = require('path');
const remark = require('remark');
const html = require('remark-html');
const premark = require('..');

const read = fs.readFileSync;
const exists = fs.existsSync;
const join = path.join;

const ROOT = join(__dirname, 'fixtures');

const fixtures = fs.readdirSync(ROOT);

test('premark()', function (t) {
	t.is(typeof premark, 'function', 'should be a function');

	t.doesNotThrow(function () {
		premark.call(remark);
	}, 'should not throw if not passed options');

	t.end();
});

test('Fixtures', function (t) {
	fixtures.forEach(function (fixture) {
		var filepath = join(ROOT, fixture);
		var output = read(join(filepath, 'output.html'), 'utf8');
		var input = read(join(filepath, 'input.md'), 'utf-8');
		var config = join(filepath, 'config.json');
		var result;

		config = exists(config) ? JSON.parse(read(config, 'utf-8')) : {};
		result = remark().use(premark).use(html, config).processSync(input).toString();

		t.deepEqual(result, output, 'should work on `' + fixture + '`');
	});

	t.end();
});
