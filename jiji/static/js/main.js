const fetchCategories = async () => {
    const response = await fetch('http://localhost:7000/categories');
    return await response.json();
}

const fetchProducts = async () => {
    const response = await fetch('http://localhost:7000/products');
    return await response.json();
}

const main = async () => {
    let categories = await fetchCategories();
    let products = await fetchProducts();

    const menu = document.querySelector('.menu');
    const ads = document.querySelector('.inner_2_2_2_ads');

    categories.forEach(category => {
        const div = document.createElement('div');
        div.innerHTML = `
                <a href="#" class="opts">
                    <div class="opt_pic">
                        <img src="data:image/png;base64,${category.image}" alt="">
                    </div>
                    <div class="opt_text">
                        <p class="text_1">${category.name}</p>
                        <p class="text_2">77,660 ads</p>

                        <div class="svg1">
                            <i class="fa-solid fa-chevron-right arrow_icon"></i>
                        </div>
                    </div>
                </a>
                `;
        menu.appendChild(div);
    });

    products.forEach(product => {
        const div = document.createElement('div');
        div.classList.add('ad');

        div.innerHTML =
            `
                 <div class="ad_div">
                            <div class="ad_pic" style="background: url(data:image/png;base64,${product.image}) center/cover no-repeat;">
                                <a href="#" class="bookmark">
                                    <i class="fa-regular fa-bookmark"></i>
                                </a>
                                <div class="top top1">
                                    <p>TOP</p>
                                </div>
                                <div class="number">
                                    <p>6</p>
                                </div>
                            </div>
                            <p>${product.name}</p>
                            <p class="price">Gh₵ ${product.price}</p>
                        </div>
            `
        ads.appendChild(div);
    });
}

main();
