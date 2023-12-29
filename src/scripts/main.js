import { consoleLog, terminalAppend, term } from "./terminal.js";
import { hoursf, minutesf, secondsf } from "./time.js";

var r = document.querySelector(':root');

const bootMsg = "Welcome to rDex-UI!\n\
vm_page_bootstrap: 987323 free pages and 53061 wired pages\n\
kext submap[0xffffff7f8072e000 - 0xffffff8000000000], kernel text[0xffffff8000200000 - 0xffffff800072e000]\n\
zone leak detection enabled\n\
standard timeslicing quantum is 10000 us\n\
mig_table_max_displ = 72\n\
TSC Deadline Timer supported and enabled\n\
rDexACPICPU: ProcessorId = 1 LocalApicId = 0 Enabled\n\
rDexACPICPU: ProcessorId = 2 LocalApicId = 2 Enabled\n\
rDexACPICPU: ProcessorId = 3 LocalApicId = 1 Enabled\n\
rDexACPICPU: ProcessorId = 4 LocalApicId = 3 Enabled\n\
rDexACPICPU: ProcessorId = 5 LocalApicId = 255 Disabled\n\
rDexACPICPU: ProcessorId = 6 LocalApicId = 255 Disabled\n\
rDexACPICPU: ProcessorId = 7 LocalApicId = 255 Disabled\n\
rDexACPICPU: ProcessorId = 8 LocalApicId = 255 Disabled\n\
calling mpo_policy_init for TMSafetyNet\n\
Security policy loaded: Safety net for Rollback(TMSafetyNet)\n\
calling mpo_policy_init for Sandbox\n\
Security policy loaded: Seatbelt sandbox policy(Sandbox)\n\
calling mpo_policy_init for Quarantine\n\
Security policy loaded: Quarantine policy(Quarantine)\n\
Copyright(c) 1982, 1986, 1989, 1991, 1993, 2015\n\
The Regents of the University of Adelaide.All rights reserved.\n\
\n\
HN_ Framework successfully initialized\n\
using 16384 buffer headers and 10240 cluster IO buffer headers\n\
IOAPIC: Version 0x20 Vectors 64: 87\n\
ACPI: System State[S0 S3 S4 S5](S3)\n\
PFM64 0xf10000000, 0xf0000000\n\
[PCI configuration begin ]\n\
rDexIntelCPUPowerManagement: Turbo Ratios 0046\n\
rDexIntelCPUPowerManagement: (built 13:08: 12 Jun 18 2011) initialization complete\n\
console relocated to 0xf10000000\n\
PCI configuration changed(bridge = 16 device = 4 cardbus = 0)\n\
[PCI configuration end, bridges 12 devices 16 ]\n\
mbinit: done[64 MB total pool size, (42 / 21) split]\n\
Pthread support ABORTS when sync kernel primitives misused\n\
com.rDex.rDexFSCompressionTypeZlib kmod start\n\
com.rDex.rDexTrololoBootScreen kmod start\n\
com.rDex.rDexFSCompressionTypeZlib load succeeded\n\
com.rDex.rDexFSCompressionTypeDataless load succeeded\n\
\n\
rDexIntelCPUPowerManagementClient: ready\n\
BTCOEXIST off\n\
wl0: Broadcom BCM4331 802.11 Wireless Controller\n\
5.100.98.75\n\
\n\
FireWire(OHCI) Lucent ID 5901 built -in now active, GUID c82a14fffee4a086; max speed s800.\n\
rooting via boot - uuid from / chosen: F5670083 - AC74 - 33D3 - 8361 - AC1977EE4AA2\n\
Waiting on & lt;dict ID =& quot; 0 & quot;& gt;& lt; key & gt; IOProviderClass & lt; /key&gt;&lt;string ID=&quot;1&quot;&gt;\n\
IOResources & lt; /string&gt;&lt;key&gt;IOResourceMatch&lt;/key & gt;& lt;string ID =& quot; 2 & quot;& gt; boot - uuid - media & lt; /string&gt;&lt;/dict & gt;\n\
Got boot device = IOService: /rDexACPIPlatformExpert/PCI0@0/rDexACPIPCI/SATA@1F, 2 /\n\
    rDexIntelPchSeriesAHCI / PRT0@0/IOAHCIDevice@0/rDexAHCIDiskDriver / SarahI@sTheBestDriverIOAHCIBlockStorageDevice/IOBlockStorageDriver/\n\
rDex SSD TS128C Media / IOGUIDPartitionScheme / Customer@2\n\
BSD root: disk0s2, major 14, minor 2\n\
Kernel is LP64\n\
IOThunderboltSwitch:: i2cWriteDWord - status = 0xe00002ed\n\
IOThunderboltSwitch:: i2cWriteDWord - status = 0x00000000\n\
IOThunderboltSwitch:: i2cWriteDWord - status = 0xe00002ed\n\
IOThunderboltSwitch:: i2cWriteDWord - status = 0xe00002ed\n\
rDexUSBMultitouchDriver:: checkStatus - received Status Packet, Payload 2: device was reinitialized\n\
MottIsAScrub:: checkstatus - true, Mott:: Scrub\n\
[IOBluetoothHCIController::setConfigState] calling registerService\n\
AirPort_Brcm4331: Ethernet address e4: ce: 8f: 46: 18: d2\n\
IO80211Controller:: dataLinkLayerAttachComplete():  adding rDexEFINVRAM notification\n\
IO80211Interface:: efiNVRAMPublished():\n\
Created virtif 0xffffff800c32ee00 p2p0\n\
BCM5701Enet: Ethernet address c8: 2a: 14: 57: a4: 7a\n\
Previous Shutdown Cause: 3\n\
NTFS driver 3.8[Flags: R / W].\n\
NTFS volume name BOOTCAMP, version 3.1.\n\
DSMOS has arrived\n\
en1: 802.11d country code set to &#039; US &#039;.\n\
en1: Supported channels 1 2 3 4 5 6 7 8 9 10 11 36 40 44 48 52 56 60 64 100 104 108 112 116 120 124 128 132 136 140 149 153 157 161 165\n\
m_thebest\n\
MacAuthEvent en1   Auth result for: 00: 60: 64: 1e: e9:e4  MAC AUTH succeeded\n\
MacAuthEvent en1   Auth result for: 00: 60: 64: 1e: e9:e4 Unsolicited  Auth\n\
wlEvent: en1 en1 Link UP\n\
AirPort: Link Up on en1\n\
en1: BSSID changed to 00: 60: 64: 1e: e9: e4\n\
virtual bool IOHIDEventSystemUserClient:: initWithTask(task *, void*, UInt32):\n\
Client task not privileged to open IOHIDSystem for mapping memory(e00002c1)\n\
\n\
\n\
Boot Complete\n".split("\n");

const errorMsg = "rDexACPICPU: ProcessorId = 5 LocalApicId = 255 Disabled\n\
rDexACPICPU: ProcessorId = 6 LocalApicId = 255 Disabled\n\
rDexACPICPU: ProcessorId = 7 LocalApicId = 255 Disabled\n\
rDexACPICPU: ProcessorId = 8 LocalApicId = 255 Disabled\n\
MacAuthEvent en1   Auth result for: 00: 60: 64: 1e: e9:e4 Unsolicited  Auth\n\
Client task not privileged to open IOHIDSystem for mapping memory(e00002c1)\n\
Client task not privileged to open IOHIDSystem for mapping memory(e00003d2)".split("\n");

function init() {
    //consoleLog("Rebooting");

    window.addEventListener('resize', resize);
    resize();

    updateFast();
    updateSlow();
    setInterval(updateFast, 100);
    setInterval(updateSlow, 30000);

    // new Audio('audio_file.mp3').play();
    r.style.setProperty('--animation-scale', 0.0);
    for (let i = 1; i <= 100; i++) {
        setTimeout(() => {
            r.style.setProperty('--animation-scale', i / 100);
        }, 2500 + i * 3.5);
    }
    
    var timeout = 0;
    for (let i = 0; i < bootMsg.length; i++) {
        switch (true) {
            case i === 4:
                timeout += 500;
                break;
            case i > 4 && i < 25:
                timeout += 30;
                break;
            case i === 25:
                timeout += 400;
                break;
            case i === 42:
                timeout += 300;
                break;
            case i > 42 && i < 82:
                timeout += 25;
                break;
            case i === 83:
                timeout += 25;
                break;
            case i >= bootMsg.length - 2 && i < bootMsg.length:
                timeout += 300;
                break;
            default:
                timeout += Math.pow(1 - (i / 1000), 3) * 25;
        }
        setTimeout(() => {
            var ttext = document.getElementById("terminal-text");
            ttext.scrollTop = ttext.scrollHeight;
            //terminalAppend(bootMsg[i]);
            term.write(bootMsg[i] + "\n\r");
        }, timeout + 2500);
    }
    timeout = 0;
    for (let i = 0; i < errorMsg.length; i++) {
        timeout += 1000 * Math.random();
        setTimeout(() => {
            errorAppend(errorMsg[i]);
            var errlog = document.getElementById("error-log");
            errlog.scrollTop = errlog.scrollHeight;
        }, timeout + 2500);
    }

    for (let i = 1; i <= 100; i++) {
        setTimeout(() => {
            r.style.setProperty('--logo-animation-scale', (1.570796 * i / 100) + 0.2);
        }, i * 3);
    }
    setTimeout(() => {
        let logo = document.getElementById("logo");
        logo.style.setProperty("display", "none")
    }, 2450);
    setTimeout(() => {
        window.__TAURI__.invoke('send_terminal', { input: "dir\n" })
    }, 6500);

}

function resize() {
    let width  = document.body.clientWidth - 320;
    let height = document.body.clientHeight - 320;

    var view_columns = document.getElementsByClassName('view-column');
    for (var i = 0; i < view_columns.length; ++i) {
        var item = view_columns[i];
        item.style.setProperty("width", Math.floor(width * 0.7) - Math.floor(width * 0.7) % 20 + 20 + "px");
        item.style.setProperty("height", height - height % 20 + "px");
    }
    var view_columns = document.getElementsByClassName('view-column-small');
    for (var i = 0; i < view_columns.length; ++i) {
        var item = view_columns[i];
        item.style.setProperty("width", Math.floor(width * 0.15) - Math.floor(width * 0.15) % 20 + "px");
    }
    let sub_view_width = Math.floor(width * 0.15) - Math.floor(width * 0.15) % 20;
    document.getElementById("left-sub-view").style.setProperty("width", sub_view_width + "px")
    document.getElementById("right-sub-view").style.setProperty("width", sub_view_width + "px")
    document.getElementById("middle-sub-view").style.setProperty("width", Math.floor(width * 0.7) - Math.floor(width * 0.7) % 20 + 20 + "px")
    var sub_view_lines = document.getElementsByClassName('sub-view-line');
    for (var i = 0; i < sub_view_lines.length; ++i) {
        var item = sub_view_lines[i];
        item.style.setProperty("width", Math.floor(sub_view_width * 0.3) - Math.floor(sub_view_width * 0.3) % 20 + 20 + "px");
    }
}


function updateFast() {
    let clockHours = document.getElementById("hours");
    let clockMinutes = document.getElementById("minutes");
    let clockSeconds = document.getElementById("seconds");
    let hours = hoursf();
    let minutes = minutesf();
    let seconds = secondsf();
    clockHours.innerHTML = hours;
    clockMinutes.innerHTML = minutes;
    clockSeconds.innerHTML = seconds;
}

function updateSlow() {
    let dataYear = document.getElementById("data-sec-year")
    let dataDate = document. getElementById("data-sec-date")

    const month = new Date().toLocaleString('default', { month: 'short' });

    dataYear.innerHTML = new Date().getFullYear();
    dataDate.innerHTML = month + " " + new Date().getDate();
}

function errorAppend(string) {
        let errlog = document.getElementById("error-log")

        let msg = document.createElement("p");
        msg.innerText = string;

        errlog.insertAdjacentElement("beforeend", msg)
}


document.addEventListener('DOMContentLoaded', function () {
    init();
});

//if (new Date().getHours() >= 6 && new Date().getHours() <= 17) {
//    console.log("Light")
//    document.querySelector("body").setAttribute("class", "light");
//}