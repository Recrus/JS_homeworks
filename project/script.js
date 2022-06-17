const BASE_URL = "http://localhost:8000";
const GOODS_URL = `${BASE_URL}/goods.json`;
const BASKET_URL = `${BASE_URL}/basket`;

function service(url) {
  return fetch(url).then((res) => res.json());
}

window.onload = () => {
  Vue.component("basket", {
    data() {
      return {
        basketGoodsItems: [],
      };
    },
    template: `<div class="cart-warp">
		<div class="cart">
			<div class="cart-name">
				<span>Cart</span>
				<img src="/project/img/cross.svg" alt="#" @click="$emit('close')" />
			</div>
			<hr />
			<div class="cart-item-wrap">
			<cart-item v-for="item in basketGoodsItems" :item="item"></cart-item>
				<hr />
			</div>
		</div>
	</div>`,
    mounted() {
      service(BASKET_URL).then((basketGoods) => {
        this.basketGoodsItems = basketGoods;
      });
    },
  });
  Vue.component("cart-item", {
    props: ["item"],
    template: `
				<div class="cart-item">
					<div class="cart-item_field">
						<span class="cart-item__title">{{ item.product_name }}</span>
						<span class="cart-item__price">{{ item.price }}р.</span>
					</div>
					<div class="cart-item__count">
					<span>{{ item.count }}шт.</span>
						<button>+</button>
						<button>-</button>
					</div>
				</div>
			`,
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
