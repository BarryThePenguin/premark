const visit = require('unist-util-visit');

const newSlide = {
	type: 'slide',
	data: {
		hName: 'section',
		hProperties: {
			className: 'slide'
		}
	}
};

function createSlides(tree) {
	let index = 0;
	const slides = [];

	function visitor(node) {
		const children = tree.children.slice(index, tree.children.indexOf(node));
		index = tree.children.indexOf(node) + 1;
		slides.push(Object.assign({}, node, newSlide, {children}));
	}

	visit(tree, 'thematicBreak', visitor);

	const remaining = tree.children.slice(index);

	if (remaining.length > 0) {
		slides.push(Object.assign({}, newSlide, {children: remaining}));
	}

	return Object.assign({}, tree, {children: slides});
}

function splitSlides() {
	return createSlides;
}

module.exports = splitSlides;
