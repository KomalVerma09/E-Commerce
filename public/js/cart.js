function updateCart(cart){
    let cartContainer = $('#cartListContainer');
    cartContainer.empty();
    cart.forEach((c) => {
        let li = `
            <li class="py-3 sm:py-4">
                        <div class="flex items-center">
                            <div class="flex-shrink-0">
                                <img class="w-8 h-8 rounded-full" src=${c.id.imageUrl} alt="Neil image">
                            </div>
                            <div class="flex-1 min-w-0 ms-4">
                                <p class="text-sm font-bold text-gray-900 truncate">
                                    ${c.id.name}
                                </p>
                                <p class="text-sm  tracking-tight text-gray-900">${c.id.description}</p>
                                <div class="text-lg font-medium text-[#111827]">$${c.id.price}</div>
                            </div>
                            <div class="inline-flex items-center text-base font-semibold text-gray-900">

                                <div class="relative flex items-center max-w-[8rem]">
                                    <a href="/shop/cartPage/decrease/${c.id._id}" class="decrease">
                                        <button type="button"
                                        class="decrement-button bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none">
                                        <svg class="w-3 h-3 text-gray-900" aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                                stroke-width="2" d="M1 1h16" />
                                        </svg>
                                    </button>
                                    </a>

                                    <input type="text"
                                        class="quantity-input bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5"
                                        value="${c.quantity}" required />

                                    <a class="increase" href="/shop/cartPage/increase/${c.id._id}">
                                        <button type="button"
                                        class="increment-button bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none">
                                        <svg class="w-3 h-3 text-gray-900" aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                                stroke-width="2" d="M9 1v16M1 9h16" />
                                        </svg>
                                    </button>
                                    </a>
                                </div>

                            </div>
                        </div>
                    </li>
        `
        cartContainer.append(li);
    });
}

// Handle increment button click

    $('body').on('click', '.increase', function (e) {
        e.preventDefault();
        let href = this.href;
        let splitHrefId = href.split('/').pop();
        console.log(splitHrefId);
        axios.get(`/shop/cartPage/increase/${splitHrefId}`).then(({data})=>{
            console.log(data);
            cart = data;
            
            updateCart(cart.id)
            let totalPrice = (data.totalPrice).toFixed(2);
            $('.totalPrice').text(totalPrice)

        })
        .catch((err)=>{
            console.log(err.message)
        })
        
    });

    // Handle decrement button click
    
    $('body').on('click', '.decrease', function (e) {
        e.preventDefault();
        let href = this.href;
        let splitHrefId = href.split('/').pop();
        console.log(splitHrefId);
        axios.get(`/shop/cartPage/decrease/${splitHrefId}`).then(({data})=>{
            console.log(data);
            cart = data;
            updateCart(cart.id)
            let totalPrice = (data.totalPrice).toFixed(2);
            $('.totalPrice').text(totalPrice)
            
        })
        .catch((err)=>{
            console.log(err.message)
        })
        
    });