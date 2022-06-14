const BASE_URL =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";
const GOODS_URL = `${BASE_URL}/catalogData.json`;
const BASKET_URL = `${BASE_URL}/getBasket.json`;

function service(url) {
  return fetch(url).then((res) => res.json());
}

window.onload = () => {
  Vue.component("basket", {
    template: `<div class="cart-warp">
		<div class="cart">
			<div class="cart-name">
				<span>Cart</span>
				<img src="/project/img/cross.svg" alt="#" @click="$emit('close')" />
			</div>
			<hr />
			<div class="cart-item-wrap">
				<div class="cart-item">
					<div class="cart-item-name">Mouse</div>
					<div class="cart-item-count">1 шт.</div>
					<div class="cart-item-price">1$</div>
				</div>
				<hr />
			</div>
			<div class="cart-total-wrap">
				<div class="cart-total">Total price: <span>1$</span></div>
			</div>
		</div>
	</div>`,
  });
  Vue.component("custom-button", {
    template: `<button class="closing-button"><span>Cart</span></button>`,
  });
  Vue.component("good", {
    props: ["item"],
    template: `
		<div class="goods-item">
      <img src="/project/img/corob.png" alt="#" />
      <hr />
      <h3>{{item.product_name}}</h3>
      <p>{{item.price}}</p>
    </div>
		`,
  });
  Vue.component("search", {
    model: {
      prop: "value",
      event: "input",
    },
    props: ["value"],
    template: `
		<div class="search">
			<input type="text" class="goods-search" :value="value" @input="$emit('input', $event.target.value)"/>
		</div>`,
  });

  const app = new Vue({
    el: "#root",
    data: {
      items: [],
      plug: [],
      search: "",
      isVisibleCart: false,
      isVisiblePlug: true,
    },
    mounted() {
      service(GOODS_URL).then((data) => {
        this.items = data;
        return data;
      });
    },
    methods: {
      visibleCart() {
        this.isVisibleCart = !this.isVisibleCart;
      },
    },
    computed: {
      getSum() {
        return this.items.reduce((prev, { price }) => {
          return prev + price;
        }, 0);
      },
      filteredItems() {
        return this.items.filter(({ product_name }) => {
          return product_name.match(new RegExp(this.search, "gui"));
        });
      },
    },
  });
};
