import QrScanner from "./qr-scanner.min.js";
const video = document.getElementById("video");
const kirim = document.querySelector(".kirim");

function basi(operation, res, req, callback) {
    Swal.fire({
        title: "SUDAH PERNAH AMBIL",
        icon: "error",
        showDenyButton: true,
        denyButtonText: "Coba Lagi",
        denyButtonColor: "#f8bb86",
    }).then((r) => {
        if (r.isDenied) {
            callback(operation, res, req);
        } else {
            location.reload();
        }
    });
}

function swalExec(operation, res, req) {
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
                    let url = "https://pttamenyala.vercel.app/api/" + operation;
                    if (result.isDenied) {
                        if (souvenir && operation == "done") {
                            basi(operation, res, req, swalExec);
                        } else {
                            url = url + "/souvenir?code=" + req;
                            let data = await fetch(url);
                            data = await data.json();
                            let final = data["data"]["data"]["isExpSouvenir"];
                            if (final) {
                                Swal.fire("SUKSES", "", "success").then(() => {
                                    location.reload();
                                });
                            } else {
                                if (operation == "undone") {
                                    Swal.fire("SUKSES", "", "success").then(
                                        () => {
                                            location.reload();
                                        }
                                    );
                                } else {
                                    Swal.fire("Coba Lagi", "", "error").then(
                                        () => {
                                            location.reload();
                                        }
                                    );
                                }
                            }
                        }
                    } else if (result.isDismissed) {
                        location.reload();
                    } else {
                        Swal.fire({
                            title: "Pilih Hidangan",
                            html: `<strong>Sudah Ambil Appetizer</strong>: ${apt}<br><strong>Sudah Ambil Main Course</strong>: ${mc}<br><strong>Sudah Ambil Dessert</strong>: ${ds}<br><button class="btn btn-primary"  onclick="location.reload()">Cancel</button>`,
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
                                if (apt && operation == "done") {
                                    basi(operation, res, req, swalExec);
                                } else {
                                    url = url + "/konsum/appetizer?code=" + req;
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
                                        if (operation == "undone") {
                                            Swal.fire(
                                                "SUKSES",
                                                "",
                                                "success"
                                            ).then(() => {
                                                location.reload();
                                            });
                                        } else {
                                            Swal.fire(
                                                "Coba Lagi",
                                                "",
                                                "error"
                                            ).then(() => {
                                                location.reload();
                                            });
                                        }
                                    }
                                }
                                // location.reload();
                            } else if (result.isDenied) {
                                if (mc && operation == "done") {
                                    basi(operation, res, req, swalExec);
                                } else {
                                    url = url + "/konsum/main?code=" + req;
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
                                        if (operation == "undone") {
                                            Swal.fire(
                                                "SUKSES",
                                                "",
                                                "success"
                                            ).then(() => {
                                                location.reload();
                                            });
                                        } else {
                                            Swal.fire(
                                                "Coba Lagi",
                                                "",
                                                "error"
                                            ).then(() => {
                                                location.reload();
                                            });
                                        }
                                    }
                                }
                                // location.reload();
                            } else {
                                if (ds && operation == "done") {
                                    basi(operation, res, req, swalExec);
                                } else {
                                    url = url + "/konsum/dessert?code=" + req;
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
                                        if (operation == "undone") {
                                            Swal.fire(
                                                "SUKSES",
                                                "",
                                                "success"
                                            ).then(() => {
                                                location.reload();
                                            });
                                        } else {
                                            Swal.fire(
                                                "Coba Lagi",
                                                "",
                                                "error"
                                            ).then(() => {
                                                location.reload();
                                            });
                                        }
                                    }
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
}

const qrScanner = new QrScanner(
    video,
    async (req) => {
        // await result.preventDefault();
        qrScanner.stop();
        document.querySelector(".hilang").classList.remove("hilang");
        let res = await fetch(
            "https://pttamenyala.vercel.app/api/check?code=" + req.data
        );
        res = await res.json();
        if (res.data) {
            swalExec("done", res, req.data);
        } else {
            Swal.fire({
                title: "DATA TIDAK ADA",
                text: req.data,
                icon: "error",
            });
        }
        // const apt = res["data"]["isExpKonsumAppt"];
        // const mc = res["data"]["isExpKonsumMain"];
        // const ds = res["data"]["isExpKonsumDessert"];
        // const name = res["data"]["name"];
        // const souvenir = res["data"]["isExpSouvenir"];
        // const email = res["data"]["email"];

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

// #############################################################################################
const searchEmailButton = document.querySelector(".cari-email");
const input = document.getElementById("imel");
const emailFilter = async (content) => {
    let url = "https://pttamenyala.vercel.app/api/check?email=" + content;
    let data = await fetch(url);
    data = await data.json();
    if (data.data.length === 0) {
        alert("Data tidak ditemukan/typo dalam penulisan");
        location.reload();
    }
    data = data.data[0].code;
    url = "https://pttamenyala.vercel.app/api/check?code=" + data;
    let finalData = await fetch(url);
    finalData = await finalData.json();
    swalExec("done", finalData, data);
};
searchEmailButton.addEventListener("click", () => {
    searchEmailButton.textContent = "Tunggu Sek";
    input.style.display = "none";
    emailFilter(input.value);
});

input.addEventListener("keypress", function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.querySelector(".cari-email").click();
    }
});

// ################################################################################
// UNDONE
// ################################################################################

const undoneEmailFilter = async (content) => {
    let url = "https://pttamenyala.vercel.app/api/check?email=" + content;
    let data = await fetch(url);
    data = await data.json();
    if (data.data.length === 0) {
        alert("Data tidak ditemukan/typo dalam penulisan");
        location.reload();
    }
    data = data.data[0].code;
    url = "https://pttamenyala.vercel.app/api/check?code=" + data;
    let finalData = await fetch(url);
    finalData = await finalData.json();
    swalExec("undone", finalData, data);
};

const undoneButton = document.querySelector(".login");
undoneButton.addEventListener("click", async () => {
    const { value: formValues } = await Swal.fire({
        title: "Input Username & Password",
        html:
            '<input id="swal-input1" class="swal2-input" placeholder="Username">' +
            '<input id="swal-input2" class="swal2-input" placeholder="Password" autocomplete="off" type="password">',
        focusConfirm: false,
        preConfirm: () => {
            return [
                document.getElementById("swal-input1").value,
                document.getElementById("swal-input2").value,
            ];
        },
    });
    if (
        formValues &&
        formValues[0] == "admin" &&
        formValues[1] == atob("YWRtaW4xMjM=")
    ) {
        document.querySelector(".wuish").innerHTML = `
        <div class="card">
                            <div class="card-body needs-validation">
                                <style>
                                    .tengah {
                                        text-align: center;
                                    }
                                </style>
                                <div class="mb-3 tengah">
                                    <label class="form-label">Undone EMAIL</label>
                                    <input type="text" class="form-control needs-validation undone-imel" id="imel" required="" value="" placeholder="e.g azusa@sma3jogja.sch.id">
                                    <div class="invalid-feedback">Isi input!</div>
                                </div>
                                <div class="mb-3 tengah">
                                    <button type="submit" class="undone btn btn-primary bg-gradient waves-effect waves-light me-1">Scan</button>
                                </div>
                            </div>
                        </div>`;
        const undoneField = document.querySelector(".undone-imel");
        document.querySelector(".undone").addEventListener("click", () => {
            document.querySelector(".undone").textContent = "Tunggu Sek";
            document.querySelector(".undone").disable = true;
            undoneField.style.display = "none";
            undoneEmailFilter(undoneField.value);
        });
    }
    if (
        formValues &&
        formValues[0] != "admin" &&
        formValues[1] != atob("YWRtaW4xMjM=")
    ) {
        alert("SALAHHHH");
    }
});
