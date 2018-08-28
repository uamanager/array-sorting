const GAPS = [1391376, 463792, 198768, 86961, 33936, 13776, 4592, 1968, 861, 336, 112, 48, 21, 7, 3, 1];

Array.prototype.swap = function (a, b) {
    let temp = this[a];
    this[a] = this[b];
    this[b] = temp;
};

Array.prototype.bubbleSort = function () {
    for (let i = (this.length - 1); i >= 0; i--) {
        for (let j = 1; j <= i; j++) {
            if (this[j - 1] > this[j]) {
                this.swap(j - 1, j);
            }
        }
    }
};

Array.prototype.selectionSort = function () {
    for (let i = 0; i < (this.length - 1); i++) {
        let min = i;
        for (let j = i + 1; j < this.length; j++) {
            if (this[j] < this[min]) {
                min = j;
            }
        }
        this.swap(i, min);
    }
};

Array.prototype.insertionSort = function () {
    for (let i = 1; i < this.length; i++) {
        let index = this[i];
        let j = i;
        while (j > 0 && this[j - 1] > index) {
            this[j] = this[j - 1];
            j--;
        }
        this[j] = index;
    }
};

Array.prototype.quickSort = function (start, end) {
    start = start || 0;
    end = end || this.length - 1;
    let p = this.partition(start, end);
    if (start < p - 1) {
        this.quickSort(start, p - 1);
    }
    if (p < end) {
        this.quickSort(p + 1, end);
    }
};

Array.prototype.partition = function (start, end) {
    let pivot = this[end];
    let i = start - 1;

    for (let j = start; j < end; j++) {
        if (this[j] < pivot) {
            i++;
            this.swap(i, j);
        }
    }
    this.swap(i + 1, end);
    return i + 1;
};

Array.prototype.heapSort = function () {
    this.heapify();

    for (let i = this.length - 1; i > 0; i--) {
        this.swap(i, 0);
        this.max_heapify(0, i);
    }
};

Array.prototype.heapify = function () {
    for (let i = Math.floor(this.length / 2); i >= 0; i--) {
        this.max_heapify(i, this.length);
    }
};

Array.prototype.max_heapify = function (i, length) {
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

        this.swap(i, largest);
        i = largest;
    }
};

Array.prototype.shellSort = function () {
    for (let g = 0; g < GAPS.length; g++) {
        let gap = GAPS[g];
        for (let i = gap; i < this.length; i++) {
            let temp = this[i];
            let j = i;
            while (j >= gap && this[j - gap] > temp) {
                this[j] = this[j - gap];
                j -= gap;
            }
            this[j] = temp;
        }
    }
};

Array.prototype.cycleSort = function () {
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
        }
    }
};

Array.prototype.oddEvenSort = function () {
    let sorted = false;
    while (!sorted) {
        sorted = true;
        for (let i = 1; i < this.length - 1; i += 2) {
            if (this[i] > this[i + 1]) {
                this.swap(i, i + 1);
                sorted = false;
            }
        }

        for (let i = 0; i < this.length - 1; i += 2) {
            if (this[i] > this[i + 1]) {
                this.swap(i, i + 1);
                sorted = false;
            }
        }
    }
};

Array.prototype.gnomeSort = function () {
    let pos = 0;

    while (pos < this.length) {
        if (pos === 0 || this[pos] >= this[pos - 1]) {
            pos++;
        } else {
            this.swap(pos, pos - 1);
            pos--;
        }
    }
};

Array.prototype.combSort = function () {
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
                this.swap(i, i + gap);
                sorted = false;
            }
        }
    }
};

Array.prototype.cocktailShakerSort = function () {
    let swapped;

    do {
        swapped = false;
        for (let i = 0; i < this.length - 1; i++) {
            if (this[i] > this[i + 1]) {
                this.swap(i, i + 1);
                swapped = true;
            }
        }

        if (!swapped) {
            break;
        }

        swapped = false;
        for (let i = this.length - 1; i >= 0; i--) {
            if (this[i] > this[i + 1]) {
                this.swap(i, i + 1);
                swapped = true;
            }
        }
    } while (swapped);
};
