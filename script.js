document.addEventListener("DOMContentLoaded", function () {
    // Get the Add to Order buttons
    const addToOrderButtons = document.querySelectorAll('.btn.btn-info');

    addToOrderButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            // Get the parent card of the clicked button
            const parentCard = button.closest('.card-body');
            // Get the product name
            const productName = parentCard.querySelector('b').innerText;
            // Get the price from the product name
            const priceRegex = /(\d+(\.\d+)?) PHP/;
            const match = productName.match(priceRegex);
            const price = match ? parseFloat(match[1]) : 0; // Extract and parse the price
            // Get the quantity
            const quantity = parseInt(parentCard.querySelector('input[name="quantity"]').value);
            // Calculate the total price
            const totalPrice = price * quantity;

            // Create a new card element for the ordered item
            const orderedItemCard = document.createElement('div');
            orderedItemCard.classList.add('card', 'mt-2');

            const orderedItemCardBody = document.createElement('div');
            orderedItemCardBody.classList.add('card-body');

            // Set the content of the ordered item card
            const orderedItemContent = `
                <p>${productName} - (${totalPrice} PHP)</p>
                <div class="quantity-label">
                    Qty: <span style="color: green;">${quantity}</span>
                </div>
            `;
            orderedItemCardBody.innerHTML = orderedItemContent;

            // Append the ordered item card to the Ordered Items section
            document.querySelector('#ordered-items').appendChild(orderedItemCard);
            orderedItemCard.appendChild(orderedItemCardBody);

            // Update total amount
            updateTotalAmount();
        });
    });

    // Handle payment
    const payButton = document.getElementById('pay');
    payButton.addEventListener('click', function () {
        const cashInput = document.getElementById('cash');
        const cashAmount = parseFloat(cashInput.value);
        const totalAmount = parseFloat(document.getElementById('total-amount').innerText);

        if (cashAmount >= totalAmount) {
            const change = cashAmount - totalAmount;
            alert(`Payment successful! Change: ${change.toFixed(2)} PHP`);
            clearOrderedItems(); // Optionally clear ordered items after payment
            reloadPage();
            
        } else {
            alert('Insufficient amount!');
        }
    });

    function reloadPage() {
        window.location.reload();
    }

    // Function to calculate the total amount
    function updateTotalAmount() {
        let total = 0;
        const orderedItems = document.querySelectorAll('#ordered-items .card-body p');
        orderedItems.forEach(function (item) {
            const totalPriceString = item.innerText.split('(')[1].split(' ')[0];
            const totalPrice = parseFloat(totalPriceString);
            total += totalPrice;
        });
        document.getElementById('total-amount').innerText = total.toFixed(2) + ' PHP';
    }

    // Function to clear ordered items
    function clearOrderedItems() {
        const orderedItemsContainer = document.getElementById('ordered-items');
        orderedItemsContainer.innerHTML = ''; // Clear the content
        document.getElementById('total-amount').innerText = '0.00 PHP'; // Reset total amount
    }
});
