import "./style.css";
import "./components/BasketItems";
import "./components/CustomButton";
import "./components/Basket";
import "./components/CustomButtonCart";
import "./components/Good";
import "./components/Search";
import { BASE_URL, GOODS, GOODS_URL, BASKET_URL } from "./constants";
import { service, serviceWithBody } from "./services";

window.onload = () => {
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
