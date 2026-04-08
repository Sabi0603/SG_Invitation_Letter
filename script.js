const DEFAULT_YEAR = "2026";

for (let i = 1; i <= 31; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.text = i;
    document.getElementById("day").appendChild(option);
}

function generate() {

    const g = document.getElementById("gender").value;
    const initial = document.getElementById("initialInput").value.toUpperCase().trim();
    const name = document.getElementById("nameInput").value.toUpperCase().trim();
    const sponsor = document.getElementById("sponsor").value;

    const type = document.querySelector('input[name="type"]:checked');

    let day = parseInt(document.getElementById("day").value);
    let month = parseInt(document.getElementById("month").value);
    
    if (!name) {
        alert("Enter name");
        return;
    }

    if (!sponsor) {
        alert("Select sponsor");
        return;
    }

    if (!type) {
        alert("Select ADD or INV");
        return;
    }

    if (!day || !month) {
        alert("Select date");
        return;
    }

    const typeValue = type.value;
    const respect = (g === "Mr") ? "SIR" : "MAM";

    const firstLetterName = name.charAt(0);
    const firstLetterSponsor = sponsor.charAt(0);
    const autoCode = firstLetterSponsor + firstLetterName;

    function getSuffix(d) {
        if (d >= 11 && d <= 13) return "TH";
        switch (d % 10) {
            case 1: return "ST";
            case 2: return "ND";
            case 3: return "RD";
            default: return "TH";
        }
    }

    const months = [
        "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
        "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
    ];

    const formattedDate =
        day + "<sup>" + getSuffix(day) + "</sup> " +
        months[month - 1] + " " +
        DEFAULT_YEAR;

    const fullName = name + "." + initial;

    document.getElementById("title").innerText = g;
    document.getElementById("title2").innerText = g;

    document.getElementById("name").innerText = fullName;
    document.getElementById("name2").innerText = fullName;

    document.getElementById("respect").innerText = respect;
    document.getElementById("respect2").innerText = respect;

    document.getElementById("code").innerText =
        "MR/" + autoCode + " - 1508 [SP - " + sponsor + " - " + typeValue + "]";

    document.getElementById("date").innerHTML = formattedDate;
}
function downloadPDF() {

    const element = document.getElementById("letter");

    // 🔥 Clone element (original disturb aagakoodathu)
    const clone = element.cloneNode(true);

    // 🔥 Wrapper create
    const wrapper = document.createElement("div");
    wrapper.style.padding = "0";
    wrapper.style.margin = "0";
    wrapper.style.background = "#fff";

    // 🔥 Important fix
    clone.style.margin = "0";
    clone.style.padding = "10px";
    clone.style.width = "210mm"; // A4 width fix

    wrapper.appendChild(clone);

    document.body.appendChild(wrapper);

    const opt = {
        margin: 0,
        filename: 'Interview_' + Date.now() + '.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: {
            scale: 2,
            scrollY: 0
        },
        jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait'
        }
    };

    html2pdf().set(opt).from(wrapper).save().then(() => {
        // 🔥 Remove temp wrapper
        document.body.removeChild(wrapper);
    });
}
