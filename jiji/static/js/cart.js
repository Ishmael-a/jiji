const fetchCart = async () => {
    const response = await fetch('https://jiji-api.onrender.com/cart/');
    //console.log(await response.json)
    return await response.json();
}


const main = async () => {
    let carts = await fetchCart();

    console.log(carts);
    const savedProducts = document.querySelector('.saved-products');
    savedProducts.innerHTML = '';

    carts.forEach((cart, index) => {
        savedProducts.innerHTML += 
        `<div class="product" data-product-name="${cart.product.name}">
            <img src="data:image/png;base64,${cart.product.image}" alt="">
            <div class="product-info">
                <div class="remove-div">
                    <h2>${cart.product.name}</h2>
                    <button class="remove-btn">Remove</button>
                </div>
                <div class="counter-container">
                    <div>
                        <p>GH₵ ${cart.product.price}</p>
                        <p>Local Used | Automatic</p>
                        <p>${cart.product.region}</p>
                    </div>
                    <div class="counter">
                        <button class="btn decrement-btn" data-index="${index}">-</button>
                        <span class="quantity" data-index="${index}">${cart.quantity}</span>
                        <button class="btn increment-btn" data-index="${index}">+</button>
                    </div>
                </div>
            </div>
        </div>`;
    });

    document.querySelectorAll('.decrement-btn').forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const productIndex = event.target.getAttribute('data-index');
            const productName = event.target.closest('.product').getAttribute('data-product-name');
            updateQuantity(productName, productIndex, 'decrement');
        });
    });

    document.querySelectorAll('.increment-btn').forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const productIndex = event.target.getAttribute('data-index');
            const productName = event.target.closest('.product').getAttribute('data-product-name');
            updateQuantity(productName, productIndex, 'increment');
        });
    });
};

const updateQuantity = async (productName, productIndex, action) => {
    let carts = await fetchCart();
    let cart = carts[productIndex];

    if (action === 'decrement' && cart.quantity > 1) {
        cart.quantity -= 1;
    } else if (action === 'increment') {
        cart.quantity += 1;
    }

    // Update the quantity in the database
    try {
        let response = await fetch('https://jiji-api.onrender.com/cart/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                productId: cart.product.id, 
                quantity: cart.quantity 
            })
        });

        if (response.ok) {
            document.querySelector(`.quantity[data-index="${productIndex}"]`).textContent = cart.quantity;
        } else {
            console.error('Failed to update quantity');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

main();
