import QrScanner from "./qr-scanner.min.js";
const video = document.getElementById("video");

const qrScanner = new QrScanner(
    video,
    (result) => {
        Swal.fire({
            title: "Apa kamu yakin data dibawah ini sesuai?",
            text: result.data,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Swal.fire("Saved!", "", "success");
            }
        });
        result.preventDefault();
        // alert(result.data);
        qrScanner.stop();
        video.remove();
    },
    { highlightScanRegion: true }
);
qrScanner.start();

let Au = async () => {
    let res = await fetch("https://pttamenyala.vercel.app/api/check?code=3075");
    res = await res.json();
    console.log(res);
};
Au();
