export default Vue.component("custom-button", {
  template: `
	<div class="custom-button-wrap" @click="$emit('click')">
		<button>
		<slot></slot>
		</button>
	</div>`,
});
