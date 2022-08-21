/*
[//]: # ( ------------------------------------------------------------------ {c)
[//]: # ( COPYRIGHT 2022 Dwij Bavisi <dwijbavisi@gmail.com>                  {c)
[//]: # ( Licensed under:                                                    {c)
[//]: # (     Taciturn Coder's `License to Hack` License                     {c)
[//]: # (     TC's L2H 1.0                                                   {c)
[//]: # ( A copy of the License may be obtained from:                        {c)
[//]: # (     https://TaciturnCoder.github.io/TCsL2H/legalcode/1.0           {c)
[//]: # ( See the License for the permissions and limitations.               {c)
[//]: # ( ------------------------------------------------------------------ {c)
*/

function check(offset, size) {
    if (machine.state != 1) {
        return false;
    }

    if (size == 0) {
        return false;
    }

    start = Math.floor(offset / machine.block_size);
    end = Math.ceil((offset + size) / machine.block_size);

    span = end - start;
    flag = 1;

    try {
        for (i = start; i < end; i += 1) {
            id = getComputedStyle(machine.cache[i]).getPropertyValue("--id");

            if (id != 0) {
                flag = 0;
                break;
            }
        }
    } catch {
        return false;
    }

    return flag;
}

function find(span, start, end) {
    if (machine.state != 1 || end - start < span) {
        return undefined;
    }

    var i = start;
    count = 0;
    flag = 0;

    for (; i < end; i += 1) {
        id = getComputedStyle(machine.cache[i]).getPropertyValue("--id");

        if (id != 0) {
            count = 0;
        } else {
            count += 1;
        }

        if (count == span) {
            flag = 1;
            break;
        }
    }

    if (flag) {
        return i - span + 1;
    } else {
        return undefined;
    }
}

function find_all() {
    dictionary = {}
    count = 0;
    index = -1;
    for (i = 0; i < machine.bitmaps.main_memory; i++) {
        if (getComputedStyle(machine.cache[i]).getPropertyValue("--id") == 0) {
            if (index == -1) {
                index = i;
            }
            count++;
        }
        else {
            if (index != -1) {
                dictionary[index] = count;
                count = 0
                index = -1
            }
        }
    }
    if (index != -1) {
        dictionary[index] = count;
    }

    let sortable = [];
    for (var ind in dictionary) {
        sortable.push([ind, dictionary[ind]]);
    }

    sortable.sort(function (a, b) {
        return a[1] - b[1];
    });

    console.log(sortable);
    return sortable;
}
