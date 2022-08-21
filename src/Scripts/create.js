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

function user_fit(offset, size) {
    if (check(offset, size)) {
        id = machine.id++;

        machine.elements.bitmap.style.setProperty("--colors", ++machine.colors);

        start = Math.floor(offset / machine.block_size);
        end = Math.ceil((offset + size) / machine.block_size);

        span = end - start;

        for (i = start; i < end; i += 1) {
            machine.cache[i].style.setProperty("--id", id);
        }

        machine.elements.message.innerHTML = `Succesfully created new process with id: ${id}<br />`;
        machine.elements.message.innerHTML += `Starting block: ${start}<br />`;
        machine.elements.message.innerHTML += `End block: ${end - 1}<br />`;
        machine.elements.message.innerHTML += `Blocks Spanned: ${span}<br />`;
        machine.elements.message.innerHTML += `Memory Allocated: ${span * machine.block_size} KiB<br />`;
        machine.elements.message.innerHTML += `Internal Fragmentation: ${span * machine.block_size - size} KiB`;

        machine.last_fit_block = end;

        e = document.createElement("option");
        e.setAttribute("value", `end_${id}`);
        e.setAttribute("start", `${start}`);
        e.setAttribute("end", `${end}`);
        e.innerHTML = `End P${id}`;

        // machine.elements.last_fit_block.innerHTML = machine.last_fit_block;
        machine.elements.end_process.appendChild(e);

        return end;
    } else {
        machine.elements.message.innerHTML = `Process creation failed<br />`;
        machine.elements.message.innerHTML += `Memory from ${offset} to ${offset + size}<br />`;
        machine.elements.message.innerHTML += `Is already in use. . .`;

        return undefined;
    }
}

function create() {
    if (machine.state != 1) {
        return undefined;
    }

    algo = machine.elements.algo.value;
    command = machine.elements.command.value.split(",");
    fn = window[`${algo}_fit`];

    if (fn == undefined) {
        return undefined;
    } else {
        fn(...command.map(Number));
    }
}
