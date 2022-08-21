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

function reset() {
    machine.elements.main_memory.setAttribute("disabled", "");
    machine.elements.block_size.setAttribute("disabled", "");
    machine.elements.kernel_space.setAttribute("disabled", "");
    machine.elements.act.removeAttribute("disabled");
    machine.elements.command.removeAttribute("disabled");
    machine.elements.create.removeAttribute("disabled");
    machine.elements.algo.removeAttribute("disabled");

    machine.elements.bitmap.style.setProperty("--colors", "2");
    machine.colors = 3;

    var i;
    for (i = 0; i < machine.bitmaps.kernel_space; i += 1) {
        machine.cache[i].style.setProperty("--id", "-1");
    }
    for (; i < machine.bitmaps.main_memory; i += 1) {
        machine.cache[i].style.setProperty("--id", "0");
    }

    machine.elements.message.innerHTML = "Machine succesfully booted!<br />";
    machine.elements.message.innerHTML += `User Space: ${machine.bitmaps.user_space * machine.block_size} KiB.<br />`;
    machine.elements.message.innerHTML += `Poor Alignment: ${machine.main_memory - machine.bitmaps.main_memory * machine.block_size} KiB.`;

    machine.elements.end_process.innerHTML = "";

    machine.state = 1;
    return;
}

function power() {
    if (machine.status > 0) {
        return;
    } else {
        if (machine.state == -1) {
            machine.elements.main_memory = document.querySelector("#main_memory");
            machine.elements.block_size = document.querySelector("#block_size");
            machine.elements.kernel_space = document.querySelector("#kernel_space");
            machine.elements.act = document.querySelector("#act");
            machine.elements.command = document.querySelector("#command");
            machine.elements.create = document.querySelector("#create");
            machine.elements.bitmap = document.querySelector("#bitmap");
            machine.elements.message = document.querySelector("#message");
            machine.elements.algo = document.querySelector("#algo");
            machine.elements.end_process = document.querySelector("#end_process");
            machine.elements.last_fit_block = document.querySelector("#last_fit_block");
        }

        machine.main_memory = Number(machine.elements.main_memory.value);
        machine.block_size = Number(machine.elements.block_size.value);
        machine.kernel_space = Number(machine.elements.kernel_space.value);

        machine.bitmaps.main_memory = Math.floor(machine.main_memory / machine.block_size);
        machine.bitmaps.kernel_space = Math.ceil(machine.kernel_space / machine.block_size);
        machine.bitmaps.user_space = machine.bitmaps.main_memory - machine.bitmaps.kernel_space;

        need = machine.bitmaps.kernel_space * 1.5;
        if (need > machine.bitmaps.main_memory) {
            machine.elements.message.innerHTML = "Not enough main memory!<br />";
            machine.elements.message.innerHTML += `You need atleast ${need * machine.block_size} KiB memory. . .`;
            return;
        }

        machine.elements.bitmap.innerHTML = "";
        machine.cache = [];
        for (i = 0; i < machine.bitmaps.main_memory; i += 1) {
            e = document.createElement("span");
            e.setAttribute("class", "bitmap");
            e.setAttribute("id", `block${i}`);
            e.addEventListener("click", machine.responsive);
            machine.elements.bitmap.appendChild(e);
            machine.cache.push(e);
        }

        reset();
    }
}

function shutdown() {
    machine.elements.main_memory.removeAttribute("disabled");
    machine.elements.block_size.removeAttribute("disabled");
    machine.elements.kernel_space.removeAttribute("disabled");
    machine.elements.act.setAttribute("disabled", "");
    machine.elements.command.setAttribute("disabled", "");
    machine.elements.create.setAttribute("disabled", "");
    machine.elements.algo.setAttribute("disabled", "");

    machine.elements.act.value = "reset";

    machine.elements.message.innerHTML = "Machine powered-off!";

    machine.state = 0;
}

function act() {
    if (machine.state == 1) {
        action = machine.elements.act.value;

        if (action == "shutdown") {
            shutdown();
            return;
        } else if (action == "reset") {
            reset();
            return;
        } else {
            end_process(action);
        }
    } else {
        power();
    }
}
