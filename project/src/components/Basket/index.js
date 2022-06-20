import { BASE_URL, GOODS, GOODS_URL, BASKET_URL } from "../../constants";
import { service, serviceWithBody } from "../../services";

export default Vue.component("basket", {
  data() {
    return {
      basketGoodsItems: [],
    };
  },
  template: `<div class="cart-warp">
	<div class="cart">
		<div class="cart-name">
			<span>Cart</span>
			<div class="cross" @click="$emit('close')" />
		</div>
		<hr />
		<div class="cart-item-wrap">
		<cart-item v-for="item in basketGoodsItems" :item="item" @add="addGood" @del="delGood"></cart-item>
			<hr />
		</div>
	</div>
</div>`,
  mounted() {
    service(BASKET_URL).then((basketGoods) => {
      this.basketGoodsItems = basketGoods;
    });
  },
  methods: {
    addGood(id) {
      serviceWithBody(BASKET_URL, "POST", {
        id,
      }).then((data) => {
        this.basketGoodsItems = data;
      });
    },
    delGood(id) {
      serviceWithBody(BASKET_URL, "DELETE", {
        id,
      }).then((data) => {
        this.basketGoodsItems = data;
      });
    },
  },
});
