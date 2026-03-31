// 🔥 Change year here only
const DEFAULT_YEAR = "2026";

// 🔥 Auto fill days
for (let i = 1; i <= 31; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.text = i;
    document.getElementById("day").appendChild(option);
}

function generate() {

    const g = document.getElementById("gender").value;
    const n = document.getElementById("nameInput").value.toUpperCase().trim();
    const sponsor = document.getElementById("sponsor").value;

    const type = document.querySelector('input[name="type"]:checked');

    let day = parseInt(document.getElementById("day").value);
    let month = parseInt(document.getElementById("month").value);

    // 🔥 Validation
    if (!n) {
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

    // 🔥 FIX: M.SABARI → SABARI
    let cleanedName = n.replace(/\./g, " ").trim();
    let words = cleanedName.split(" ");
    let actualName = words[words.length - 1];

    const firstLetterName = actualName.charAt(0);
    const firstLetterSponsor = sponsor.charAt(0);

    // 🔥 CODE (SP first + Name)
    const autoCode = firstLetterSponsor + firstLetterName;

    // 🔥 Date format
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
        "JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE",
        "JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"
    ];

    const formattedDate =
        day + "<sup>" + getSuffix(day) + "</sup> " +
        months[month - 1] + " " +
        DEFAULT_YEAR;

    // 🔥 Assign
    document.getElementById("title").innerText = g;
    document.getElementById("title2").innerText = g;

    document.getElementById("name").innerText = n;
    document.getElementById("name2").innerText = n;

    document.getElementById("respect").innerText = respect;
    document.getElementById("respect2").innerText = respect;

    document.getElementById("code").innerText =
        "MR/" + autoCode + " - 1508 [SP - " + sponsor + " - " + typeValue + "]";

    document.getElementById("date").innerHTML = formattedDate;
}

// 🔥 PDF
function downloadPDF() {
    const element = document.getElementById("letter");

    html2pdf().from(element).save("Interview_Information_Letter.pdf");
}