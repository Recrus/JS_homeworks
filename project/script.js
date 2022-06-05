const BASE_URL =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";
const GOODS_URL = `${BASE_URL}/catalogData.json`;
const BASKET_URL = `${BASE_URL}/getBasket.json`;

function service(url) {
  return fetch(url).then((res) => res.json());
}

window.onload = () => {
  const app = new Vue({
    el: "#root",
    data: {
      items: [],
      plug: [],
      searchValue: "",
      isVisibleCart: false,
      isVisiblePlug: true,
    },
    mounted() {
      service(GOODS_URL).then((data) => {
        debugger;
        this.items = data;
        return data;
      });
    },
    methods: {
      visibleCart() {
        if (this.isVisibleCart === false) {
          this.isVisibleCart = true;
        } else {
          this.isVisibleCart = false;
        }
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
          return product_name.match(new RegExp(this.searchValue, "gui"));
        });
      },
    },
  });
};
