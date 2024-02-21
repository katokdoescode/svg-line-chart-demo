/**
 * Chart
 */
const svg = document.querySelector('.timeline-chart');
const path = svg.querySelector('#line');
const pattern = svg.querySelector('#grid');
const yLabels = svg.querySelectorAll('.y-labels text');

const updateLinePath = () => {
	const points = svg.querySelectorAll('.dot');
	const svgRect = svg.getBoundingClientRect();

	let d = '';
	points.forEach((point, index) => {
		const x = (parseFloat(point.getAttribute('cx')) / 100) * svgRect.width;
		const y = (parseFloat(point.getAttribute('cy')) / 100) * svgRect.height;
		if (index === 0) {
			d += `M${x},${y} `;
		} else {
			const prevX =
				(parseFloat(points[index - 1].getAttribute('cx')) / 100) *
				svgRect.width;
			const prevY =
				(parseFloat(points[index - 1].getAttribute('cy')) / 100) *
				svgRect.height;
			const cp1x = (prevX + x) / 2;
			const cp1y = prevY;
			const cp2x = (prevX + x) / 2;
			const cp2y = y;
			d += `C${cp1x},${cp1y} ${cp2x},${cp2y} ${x},${y} `;
		}
	});

	if (svgRect.width <= 700) {
		pattern.setAttribute('width', '21.16%');
		pattern.setAttribute('x', '-11%');
		yLabels.forEach((label) => {
			label.textContent = label.getAttribute('short-name');
		});
	} else {
		pattern.setAttribute('width', '10.58%');
		pattern.setAttribute('x', '-.6%');
		yLabels.forEach((label) => {
			label.textContent = label.getAttribute('long-name');
		});
	}

	path.setAttribute('d', d);
};

const resizeObserver = new ResizeObserver((entries) => {
	entries.forEach(() => updateLinePath());
});

resizeObserver.observe(svg);
updateLinePath();

/* Controls */
const chartWidthInput = document.getElementById('chart-width');
const currentWidth = document.getElementById('current-width');
const showAllDots = document.getElementById('show-all-dots');

chartWidthInput.oninput = ({ target }) => {
	const { value } = target;
	svg.style.maxWidth = currentWidth.textContent = `${value}px`;
};

showAllDots.onchange = ({ target }) => {
	svg.classList.toggle('all-dots', target.checked);

	if (target.checked) {
		pattern.setAttribute('width', '21.16%');
		pattern.setAttribute('x', '-11%');
	} else {
		pattern.setAttribute('width', '10.58%');
		pattern.setAttribute('x', '-.6%');
	}
};
