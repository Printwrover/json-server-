const imageSlider = document.querySelector('.image-slider');
let slideIndex = 0;

function showSlides() {
    slideIndex++;
    if (slideIndex >= 3) {
        slideIndex = 0;
    }

    const translateValue = -slideIndex * 100;
    imageSlider.style.transform = `translateX(${translateValue}%)`;
    setTimeout(showSlides, 3000); // Change slide every 3 seconds
}

function submitForm() {
    document.getElementById("registerForm").submit();
}

showSlides(); // Start the slideshow