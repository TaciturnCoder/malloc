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

function end_process(id) {
    e = document.querySelector(`[value=${id}]`);

    start = Number(e.getAttribute("start"));
    end = Number(e.getAttribute("end"));

    machine.elements.bitmap.style.setProperty("--colors", --machine.colors);

    for (i = start; i < end; i += 1) {
        machine.cache[i].style.setProperty("--id", "0");
    }

    e.parentElement.removeChild(e);

    machine.elements.message.innerHTML = "Process Terminated: <br />";
    machine.elements.message.innerHTML += `Process ID: ${id.replace("end_", "")}<br />`;
    machine.elements.message.innerHTML += `Starting Block: ${start}<br />`;
    machine.elements.message.innerHTML += `End Block: ${end}<br />`;
    machine.elements.message.innerHTML += `Blocks Spanned: ${span}<br />`;
    machine.elements.message.innerHTML += `Memory Freed: ${span * machine.block_size} KiB`;
}
