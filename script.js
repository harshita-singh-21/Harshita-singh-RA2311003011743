document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("certificateUpload").addEventListener("change", function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const certificateList = document.getElementById("certificateList");
                const fileType = file.type;

                if (fileType.includes("image")) {
                    const img = document.createElement("img");
                    img.src = e.target.result;
                    img.alt = "Certificate";
                    img.style.width = "200px";
                    img.style.margin = "10px";
                    img.style.border = "2px solid yellow";
                    certificateList.appendChild(img);
                } else if (fileType.includes("pdf")) {
                    const link = document.createElement("a");
                    link.href = e.target.result;
                    link.textContent = file.name;
                    link.target = "_blank";
                    link.style.display = "block";
                    link.style.color = "yellow";
                    link.style.margin = "10px";
                    certificateList.appendChild(link);
                }
            };
            reader.readAsDataURL(file);
        }
    });
});