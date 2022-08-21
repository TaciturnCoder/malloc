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

function best_fit(size) {
    span = Math.ceil(size / machine.block_size);

    sortable = find_all()
    temp = 0
    for (i = 0; i < sortable.length; i++) {
        if (sortable[i][1] >= span) {
            temp = Number(sortable[i][0])
            break
        }
    }

    // console.log()

    if (temp == 0) {
        machine.elements.message.innerHTML = `Process creation failed<br />`;
        machine.elements.message.innerHTML += `Unable to allocate ${size} KiB<br />`;
        machine.elements.message.innerHTML += `Try ending a few processes. . .`;
    } else {
        user_fit(temp * machine.block_size, size);
    }
}
