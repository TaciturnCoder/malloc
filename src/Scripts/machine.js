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

var machine = {
    state: -1,
    main_memory: 0,
    block_size: 0,
    kernel_space: 0,
    elements: {
        main_memory: undefined,
        block_size: undefined,
        kernel_space: undefined,
        act: undefined,
        command: undefined,
        create: undefined,
        bitmap: undefined,
        message: undefined,
        algo: undefined,
        end_process: undefined,
        last_fit_block: undefined,
    },
    bitmaps: {
        main_memory: 0,
        kernel_space: 0,
        user_space: 0
    },
    cache: [],
    id: 1,
    last_fit_block: 0,
    colors: 0,
    responsive: function (e) {
        if (machine.state != 1) {
            return undefined;
        }

        element = e.target;

        id = getComputedStyle(element).getPropertyValue("--id")

        try {
            elem = document.querySelector(`[value=end_${id}]`);
            start = Number(elem.getAttribute("start"));
            end = Number(elem.getAttribute("end")) - 1;
            span = end - start + 1;

            machine.elements.act.value = `end_${id}`;
        } catch {
            if (id == -1) {
                id = "Operating System"
                start = 0;
                end = machine.bitmaps.kernel_space - 1;
                span = end + 1;
            } else if (id == 0) {
                id = "Free Region"
                start = "Unset";
                end = "Unset";
                span = "Unset";
            }
        }

        machine.elements.message.innerHTML = "Viewing Process Information: <br />";
        machine.elements.message.innerHTML += `Process ID: ${id}<br />`;
        machine.elements.message.innerHTML += `Starting Block: ${start}<br />`;
        machine.elements.message.innerHTML += `End Block: ${end}<br />`;
        machine.elements.message.innerHTML += `Blocks Spanned: ${span}<br />`;
    }
}
