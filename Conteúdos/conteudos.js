document.querySelectorAll(".btn-topo").forEach(function(btn) {
    btn.addEventListener("click", function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});
