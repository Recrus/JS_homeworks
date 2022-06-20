import { BASE_URL, GOODS, GOODS_URL, BASKET_URL } from "../../constants";
import { service, serviceWithBody } from "../../services";

export default Vue.component("good", {
  props: ["item"],
  template: `
	<div class="goods-item">
		<div class="corob">1</div>
		<hr />
		<h3>{{item.product_name}}</h3>
		<p>{{item.price}}</p>
		<div>
			<custom-button @click="addGood">Add to cart</custom-button>
		</div>
	</div>
	`,
  methods: {
    addGood() {
      serviceWithBody(BASKET_URL, "POST", {
        id: this.item.id_product,
      });
    },
  },
});
