const fetchCart = async () => {
    const response = await fetch('https://jiji-api.onrender.com/cart/');
    console.log(response.json)
    //return await response.json();
}

fetchCart();

// const main = async () => {
//     let carts = await fetchCart();

//     console.log(carts);
//     // const savedProducts = document.querySelector('.saved-products');
//     // savedProducts.innerHTML = '';

//     // carts.forEach(cart => {
        
//     // });

// }

// main();
