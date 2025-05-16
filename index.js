
// picture enlarge for our cakes
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll('.product img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('.lightbox .close');

  images.forEach(img => {
    img.addEventListener('click', () => {
      lightbox.style.display = 'block';
      lightboxImg.src = img.src;
    });
  });

  closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = 'none';
    }
  });
});

// theme of the cake picture preview
const input = document.getElementById('referenceImage');
const preview = document.getElementById('previewImage');

input.addEventListener('change', function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      preview.src = e.target.result;
      preview.style.display = 'block';
    }
    reader.readAsDataURL(file);
  } else {
    preview.style.display = 'none';
  }
});
const form = document.getElementById('cakeOrderForm');

form.addEventListener('submit', function () {
  // Reset image preview
  preview.src = '';
  preview.style.display = 'none';
  input.value = '';
});



// Custom Cake Order Submission
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("cakeOrderForm");
  const confirmationMessage = document.getElementById("confirmationMessage");

  const flavorSelect = form.flavor;
  const sizeSelect = form.size;
  const layersInput = form.layers;
  const basePriceSpan = document.getElementById("basePrice");
  const layerPriceSpan = document.getElementById("layerPrice");
  const totalPriceSpan = document.getElementById("totalPrice");

  const pricePerSize = {
    "1 pound": 1500,
    "2 pound": 2500,
    "3 pound": 3500
  };

  const pricePerExtraLayer = 300;

  function calculateBill() {
    const size = sizeSelect.value;
    const layers = parseInt(layersInput.value) || 1;

    let basePrice = pricePerSize[size] || 0;

    // Only charge if layers are 3 or more
    let layerPrice = (layers >= 3) ? (layers - 2) * pricePerExtraLayer : 0;

    let total = basePrice + layerPrice;

    basePriceSpan.textContent = basePrice;
    layerPriceSpan.textContent = layerPrice;
    totalPriceSpan.textContent = total;

    return total;
  }

  // Recalculate bill on any change
  flavorSelect.addEventListener("change", calculateBill);
  sizeSelect.addEventListener("change", calculateBill);
  layersInput.addEventListener("input", calculateBill);

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const totalPrice = calculateBill(); // Make sure bill is updated

      const flavor = flavorSelect.value;
      const size = sizeSelect.value;
      const layers = layersInput.value;
      const message = form.message.value || "No message";
      const delivery = form.delivery.value;
      const deliveryTime = form.deliveryTime.value;
      const theme = form.theme.value;

      const summary = `🎂 Your ${flavor} cake (${size}, ${layers} layer(s)) with a "${theme}" theme and message "${message}" 
will be delivered on ${delivery} at ${deliveryTime}. Total Price: Rs. ${totalPrice}`;

      confirmationMessage.innerHTML = `${summary}<br>🎉 <strong>Your order has been placed! We will contact you soon.</strong>`;

      form.reset();

      basePriceSpan.textContent = 0;
      layerPriceSpan.textContent = 0;
      totalPriceSpan.textContent = 0;

    });
  }

});

// order tracking
function trackOrder() {
  const name = document.getElementById("customerName").value.trim().toLowerCase();
  const phone = document.getElementById("customerPhone").value.trim();

  // Demo: You can add actual records here in future (e.g., from database)
  if (name === "ayesha" && phone === "03001234567") {
    document.getElementById("trackResult").textContent = "🎂 Your order is being prepared. Expected delivery: 6 PM today.";
  } else {
    document.getElementById("trackResult").textContent = "❌ No matching order found. Please check your details.";
  }
}
