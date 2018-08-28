let r,
    a, b,
    step = 0,
    maxA,
    minA,
    type,
    auto,
    frameRateEl = document.getElementsByClassName('frame-rate')[0],
    performanceTimeEl = document.getElementsByClassName('performance-time')[0];

const types = [
    'bubble',
    'selection',
    'insertion',
    'quick',
    'heap',
    'shell',
    'cycle',
    'oddEven',
    'gnome',
    'comb',
    'cocktailShaker',
];

function performanceTime() {
    const before = new Date().getTime();
    b[type + 'Sort']();
    const after = new Date().getTime();
    const time = after - before;
    performanceTimeEl.innerHTML = time.toString();
}

function setup() {
    params = window.location.search.replace('?', '').split('&');
    type = params[0];
    auto = !!params[1];
    a = shuffle(mapFill(new Array(1000), 0, 255));
    b = a.slice();
    minA = min(a);
    maxA = max(a);

    for (let i = 0; i < types.length; i++) {
        let button = createButton(types[i]);
        button.position(10, 50 + (25 * i));
        types[i] === type ? button.class('btn-link active') : button.class('btn-link');
        button.mousePressed(() => {
            window.location.search = [types[i], auto ? 'auto' : ''].join('&');
        });

    }

    performanceTime();
    console.log(b);
    a[type + 'SortVisual']();
    createCanvas(window.innerWidth, window.innerHeight);
    colorMode(HSL);
}

function draw() {
    clear();
    let rectWidth = width / a.length;
    let aspect = height / maxA;
    noStroke();

    if (a.stepsVisual[step]) {
        frameRateEl.innerHTML = Math.round(frameRate()).toString();

        for (let i = 0; i < a.stepsVisual[step].value.length; i++) {
            let rectHeight = a.stepsVisual[step].value[i] * aspect;
            fill(a.stepsVisual[step].value[i], 100, 50);
            // rect(rectWidth * i, 0, rectWidth, height);
            rect(rectWidth * i, height - rectHeight, rectWidth, rectHeight);
        }

        if (step < a.stepsVisual.length - 1) {
            a.stepsVisual[step].operations.forEach((operation, operationIndex) => {
                a.stepsVisual[step].operations[operationIndex].elements.forEach((item) => {
                    let rectHeight = a.stepsVisual[step].value[item] * aspect;
                    fill('red');
                    rect(rectWidth * item, height - rectHeight, rectWidth, rectHeight);
                });
            });

            step++;
        } else if(auto) {
            const index = types.indexOf(type);
            if(index !== types.length - 1){
                window.location.search = [types[index + 1], auto ? 'auto' : ''].join('&');
            }
        }
    }
}

function mapFill(arr, min, max) {
    for (let i = 0; i < arr.length; i++) {
        let pos = arr.length / (max - min);
        arr[i] = map((i + 1) / pos, min, max, min, max);
    }

    return arr;
}