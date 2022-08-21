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

function next_fit(size, last_fit_block = machine.last_fit_block) {
    if (machine.state != 1) {
        return false;
    }

    span = Math.ceil(size / machine.block_size);

    start = find(span, last_fit_block, machine.bitmaps.main_memory);
    if (start == undefined) {
        start = find(span, machine.bitmaps.kernel_space, last_fit_block);
    }

    if (start == undefined) {
        machine.elements.message.innerHTML = `Process creation failed<br />`;
        machine.elements.message.innerHTML += `Unable to allocate ${size} KiB<br />`;
        machine.elements.message.innerHTML += `Try ending a few processes. . .`;
    } else {
        user_fit(start * machine.block_size, size);
    }
}
