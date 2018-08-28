Array.prototype.stepsVisual = [];
Array.prototype.stepVisual = {
    operations: [],
    value: []
};
Array.prototype.stepOperationVisual = function (operation) {
    this.stepVisual.operations.push(operation);
};
Array.prototype.nextStepVisual = function (value) {
    this.stepVisual.value = value.slice();
    this.stepsVisual.push(this.stepVisual);
    this.stepVisual = {
        operations: [],
        value: []
    };
};

Array.prototype.swapVisual = function (a, b) {
    let temp = this[a];
    this[a] = this[b];
    this[b] = temp;
    this.stepOperationVisual({
        type: 'swap',
        elements: [a, b]
    });
};

const GAPS_VISUAL = [1391376, 463792, 198768, 86961, 33936, 13776, 4592, 1968, 861, 336, 112, 48, 21, 7, 3, 1];

Array.prototype.bubbleSortVisual = function () {
    for (let i = (this.length - 1); i >= 0; i--) {
        for (let j = 1; j <= i; j++) {
            if (this[j - 1] > this[j]) {
                this.swapVisual(j - 1, j);
            }
        }
        this.nextStepVisual(this);
    }
    this.nextStepVisual(this);
};

Array.prototype.selectionSortVisual = function () {
    for (let i = 0; i < (this.length - 1); i++) {
        let min = i;
        for (let j = i + 1; j < this.length; j++) {
            if (this[j] < this[min]) {
                min = j;
            }
        }
        this.swapVisual(i, min);
        this.nextStepVisual(this);
    }
    this.nextStepVisual(this);
};

Array.prototype.insertionSortVisual = function () {
    for (let i = 1; i < this.length; i++) {
        let index = this[i];
        let j = i;
        while (j > 0 && this[j - 1] > index) {
            this.stepOperationVisual({
                type: 'swap',
                elements: [j - 1, j]
            });
            this[j] = this[j - 1];
            j--;
        }
        this.stepOperationVisual({
            type: 'swap',
            elements: [j, index]
        });
        this[j] = index;
        this.nextStepVisual(this);
    }
    this.nextStepVisual(this);
};

Array.prototype.quickSortVisual = function (start, end) {
    start = start || 0;
    end = end || this.length - 1;
    let p = this.partitionVisual(start, end);
    if (start < p - 1) {
        this.quickSortVisual(start, p - 1);
    }
    if (p < end) {
        this.quickSortVisual(p + 1, end);
    }
    this.nextStepVisual(this);
};

Array.prototype.partitionVisual = function (start, end) {
    let pivot = this[end];
    let i = start - 1;

    for (let j = start; j < end; j++) {
        if (this[j] < pivot) {
            i++;
            this.swapVisual(i, j);
        }
    }
    this.swapVisual(i + 1, end);
    this.nextStepVisual(this);
    return i + 1;
};

Array.prototype.heapSortVisual = function () {
    this.heapifyVisual();

    for (let i = this.length - 1; i > 0; i--) {
        this.swapVisual(i, 0);
        this.maxHeapifyVisual(0, i);
        this.nextStepVisual(this);
    }
    this.nextStepVisual(this);
};

Array.prototype.heapifyVisual = function () {
    for (let i = Math.floor(this.length / 2); i >= 0; i--) {
        this.maxHeapifyVisual(i, this.length);
        this.nextStepVisual(this);
    }
};

Array.prototype.maxHeapifyVisual = function (i, length) {
    while (true) {
        let left = i * 2 + 1;
        let right = i * 2 + 2;
        let largest = i;

        if (left < length && this[left] > this[largest]) {
            largest = left;
        }

        if (right < length && this[right] > this[largest]) {
            largest = right;
        }

        if (i === largest) {
            break;
        }

        this.swapVisual(i, largest);
        i = largest;
    }
};

Array.prototype.shellSortVisual = function () {
    for (let g = 0; g < GAPS_VISUAL.length; g++) {
        let gap = GAPS_VISUAL[g];
        for (let i = gap; i < this.length; i++) {
            let temp = this[i];
            let j = i;
            while (j >= gap && this[j - gap] > temp) {
                this[j] = this[j - gap];
                this.stepOperationVisual({
                    type: 'swap',
                    elements: [j, j - 1]
                });
                j -= gap;
            }
            this[j] = temp;
            this.stepOperationVisual({
                type: 'swap',
                elements: [i, j]
            });
            this.nextStepVisual(this);
        }
    }
    this.nextStepVisual(this);
};

Array.prototype.cycleSortVisual = function () {
    for (let cycleStart = 0; cycleStart < this.length - 1; cycleStart++) {
        let item = this[cycleStart];
        let itemIndex = cycleStart;
        let pos = cycleStart;

        for (let i = cycleStart + 1; i < this.length; i++) {
            if (this[i] < item) {
                pos += 1;
            }
        }

        if (pos === cycleStart) {
            continue;
        }

        while (item === this[pos]) {
            pos += 1;
        }

        const swap = this[pos];
        this[pos] = item;
        item = swap;
        itemIndex = pos;
        this.stepOperationVisual({
            type: 'swap',
            elements: [pos, itemIndex]
        });
        this.nextStepVisual(this);

        while (pos !== cycleStart) {
            pos = cycleStart;

            for (let i = cycleStart + 1; i < this.length; i++) {
                if (this[i] < item) {
                    pos += 1;
                }
            }

            while (item === this[pos]) {
                pos += 1;
            }
            const swap = this[pos];
            this[pos] = item;
            item = swap;
            itemIndex = pos;
            this.stepOperationVisual({
                type: 'swap',
                elements: [pos, itemIndex]
            });
            this.nextStepVisual(this);
        }
    }
    this.nextStepVisual(this);
};

Array.prototype.oddEvenSortVisual = function () {
    let sorted = false;
    while (!sorted) {
        sorted = true;
        for (let i = 1; i < this.length - 1; i += 2) {
            if (this[i] > this[i + 1]) {
                this.swapVisual(i, i + 1);
                sorted = false;
            }
        }

        for (let i = 0; i < this.length - 1; i += 2) {
            if (this[i] > this[i + 1]) {
                this.swapVisual(i, i + 1);
                sorted = false;
            }
        }
        this.nextStepVisual(this);
    }
    this.nextStepVisual(this);
};

Array.prototype.gnomeSortVisual = function () {
    let pos = 0;

    while (pos < this.length) {
        if (pos === 0 || this[pos] >= this[pos - 1]) {
            pos++;

            if (this[pos + 1] <= this[pos]) {
                this.nextStepVisual(this);
            }
        } else {
            this.swapVisual(pos, pos - 1);
            pos--;
        }
    }
    this.nextStepVisual(this);
};

Array.prototype.combSortVisual = function () {
    let gap = this.length;
    const shrink = 1.3;
    let sorted = false;

    while (!sorted) {
        gap = Math.floor(gap / shrink);
        if (gap > 1) {
            sorted = false;
        } else {
            gap = 1;
            sorted = true;
        }

        for (let i = 0; i < this.length; i++) {
            if (this[i] > this[i + gap]) {
                this.swapVisual(i, i + gap);
                sorted = false;
                this.nextStepVisual(this);
            }
        }
    }
    this.nextStepVisual(this);
};


Array.prototype.cocktailShakerSortVisual = function () {
    let swapped;

    do {
        swapped = false;
        for (let i = 0; i < this.length - 1; i++) {
            if (this[i] > this[i + 1]) {
                this.swapVisual(i, i + 1);
                swapped = true;
            }
        }
        this.nextStepVisual(this);

        if (!swapped) {
            break;
        }

        swapped = false;
        for (let i = this.length - 1; i >= 0; i--) {
            if (this[i] > this[i + 1]) {
                this.swapVisual(i, i + 1);
                swapped = true;
            }
        }
        this.nextStepVisual(this);
    } while (swapped);
    this.nextStepVisual(this);
};