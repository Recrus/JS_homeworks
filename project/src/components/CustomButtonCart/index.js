Vue.component("custom-button-cart", {
  template: `
	<div class="button-wrap" @click="$emit('click')">
		<button class="closing-button"><span>Cart</span></button>
	</div>`,
});
