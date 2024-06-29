import QrScanner from "./qr-scanner.min.js";
const video = document.getElementById("video");
const kirim = document.querySelector(".kirim");

const qrScanner = new QrScanner(
    video,
    async (waw) => {
        // await result.preventDefault();
        qrScanner.stop();
        document.querySelector(".hilang").classList.remove("hilang");
        let res = await fetch(
            "https://pttamenyala.vercel.app/api/check?code=" + waw.data
        );
        res = await res.json();
        const apt = res["data"]["isExpKonsumAppt"];
        const mc = res["data"]["isExpKonsumMain"];
        const ds = res["data"]["isExpKonsumDessert"];
        const name = res["data"]["name"];
        const souvenir = res["data"]["isExpSouvenir"];
        const email = res["data"]["email"];
        Swal.fire({
            title: "Apa kamu yakin data dibawah ini sesuai?",
            html: `<strong>Name</strong>: ${name}<br><strong>Email</strong>: ${email}<br><strong>Sudah Ambil Appetizer</strong>: ${apt}<br><strong>Sudah Ambil Main Course</strong>: ${mc}<br><strong>Sudah Ambil Dessert</strong>: ${ds}<br><strong>Sudah Ambil Souvenir</strong>: ${souvenir}`,
            showDenyButton: true,
            confirmButtonText: "Yes",
        })
            .then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Pilih",
                        icon: "question",
                        showDenyButton: true,
                        // Denied Button = SOUVENIR
                        // Confirm Button = KONSUM
                        denyButtonText: "Souvenir",
                        denyButtonColor: "#f8bb86",
                        confirmButtonColor: "#a5dc86",
                        confirmButtonText: "Konsum",
                        showCancelButton: true,
                    }).then(async (result) => {
                        let url = "https://pttamenyala.vercel.app/api/done";
                        if (result.isDenied) {
                            if (souvenir) {
                                Swal.fire(
                                    "SUDAH PERNAH AMBIL",
                                    "",
                                    "error"
                                ).then(() => {
                                    location.reload();
                                });
                            } else {
                                url = url + "/souvenir?code=" + waw.data;
                                let data = await fetch(url);
                                data = await data.json();
                                let final =
                                    data["data"]["data"]["isExpSouvenir"];
                                if (final) {
                                    Swal.fire("SUKSES", "", "success").then(
                                        () => {
                                            location.reload();
                                        }
                                    );
                                } else {
                                    Swal.fire("Coba Lagi", "", "error");
                                }
                            }
                        } else if (result.isDismissed) {
                            location.reload();
                        } else {
                            Swal.fire({
                                title: "Pilih Hidangan",
                                html: `<strong>Sudah Ambil Appetizer</strong>: ${apt}<br><strong>Sudah Ambil Main Course</strong>: ${mc}<br><strong>Sudah Ambil Dessert</strong>: ${ds}`,
                                icon: "question",
                                // CANCEL BUTTON = APPETIZER
                                showCancelButton: true,
                                cancelButtonText: "Appetizer",
                                cancelButtonColor: "#4681f4",

                                // DENY BUTTON = MAIN COURSE
                                showDenyButton: true,
                                denyButtonText: "Main Course",
                                denyButtonColor: "#33b249",

                                // CONFIRM BUTTON = DESSERT
                                showConfirmButton: true,
                                confirmButtonText: "Dessert",
                                confirmButtonColor: "#f8bb86",
                            }).then(async (result) => {
                                if (result.isDismissed) {
                                    url =
                                        url +
                                        "/konsum/appetizer?code=" +
                                        waw.data;
                                    let data = await fetch(url);
                                    data = await data.json();
                                    let final =
                                        data["data"]["data"]["isExpKonsumAppt"];
                                    if (final) {
                                        Swal.fire("SUKSES", "", "success").then(
                                            () => {
                                                location.reload();
                                            }
                                        );
                                    } else {
                                        Swal.fire(
                                            "Coba Lagi",
                                            "",
                                            "error"
                                        ).then(() => {
                                            location.reload();
                                        });
                                    }

                                    // location.reload();
                                } else if (result.isDenied) {
                                    url = url + "/konsum/main?code=" + waw.data;
                                    let data = await fetch(url);
                                    data = await data.json();
                                    let final =
                                        data["data"]["data"]["isExpKonsumMain"];
                                    if (final) {
                                        Swal.fire("SUKSES", "", "success").then(
                                            () => {
                                                location.reload();
                                            }
                                        );
                                    } else {
                                        Swal.fire(
                                            "Coba Lagi",
                                            "",
                                            "error"
                                        ).then(() => {
                                            location.reload();
                                        });
                                    }

                                    // location.reload();
                                } else {
                                    url =
                                        url +
                                        "/konsum/dessert?code=" +
                                        waw.data;
                                    let data = await fetch(url);
                                    data = await data.json();
                                    let final =
                                        data["data"]["data"][
                                            "isExpKonsumDessert"
                                        ];
                                    if (final) {
                                        Swal.fire("SUKSES", "", "success").then(
                                            () => {
                                                location.reload();
                                            }
                                        );
                                    } else {
                                        Swal.fire(
                                            "Coba Lagi",
                                            "",
                                            "error"
                                        ).then(() => {
                                            location.reload();
                                        });
                                    }

                                    // location.reload();
                                }
                            });
                        }
                    });
                } else if (result.isDenied) {
                    // Swal.fire("Baiklah!", "", "error");
                    location.reload();
                }
            })
            .then(() => {});
        // alert(result.data);
        // video.remove();
    },
    { highlightScanRegion: true }
);
kirim.addEventListener("click", () => {
    kirim.style.display = "none";
    document.querySelector(".video").classList.remove("video");
    video.classList.add("muncul");
    qrScanner.start();
});
