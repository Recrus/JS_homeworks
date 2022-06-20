export default Vue.component("cart-item", {
  props: ["item"],
  template: `
			<div class="cart-item">
				<div class="cart-item_field">
					<span class="cart-item__title">{{ item.product_name }}</span>
					<span class="cart-item__price">{{ item.price }}р.</span>
				</div>
				<div class="cart-item__count">
				<span>{{ item.count }}шт.</span>
					<button @click="$emit('add', item.id_product)">+</button>
					<button @click="$emit('del', item.id_product)">-</button>
				</div>
			</div>
		`,
});
