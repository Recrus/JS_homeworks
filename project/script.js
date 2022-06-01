const goods = [
  { title: 'Shirt', price: 150 },
  { title: 'Socks', price: 50 },
  { title: 'Jacket', price: 350 },
  { title: 'Shoes', price: 250 },
];

const BASE_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const GOODS_URL = `${BASE_URL}/catalogData.json`
const BASKET_URL = `${BASE_URL}/getBasket.json`

function service(url) {
	return fetch(url)
	.then((res) => res.json())
}

class GoodsItem {
  constructor({product_name = '', price = 0}) {
    this.title = product_name;
    this.price = price;
  }
	render() {
		return `
			<div class="goods-item">
				<img src="/project/img/corob.png" alt="">
				<hr>
				<h3>${this.title}</h3>
				<p>${this.price}$</p>
			</div>
		`;
	}
}

class GoodsList {
	items = [];
	filteredItems = [];
	fetchData () {
		return service(GOODS_URL).then((data) => {
        this.items = data;
        this.filteredItems = data;
    });
	}
	filter(input) {
		this.filteredItems = this.items.filter(({ product_name }) => {
      return (new RegExp(input, 'gui')).test(product_name);
		})
	}
	getSum() {
		return this.items.reduce((prev, { price }) => {
      return prev + price;
    }, 0)
  }
	render() {
		const goods = this.filteredItems.map(item => {
			const goodItem = new GoodsItem(item);
			return goodItem.render()
		}).join('');
		document.querySelector('.goods-list').innerHTML = goods;
	}
}

class BasketGoods {
	items = [];
	fetchData () {
		return service(BASKET_URL).then((data) => {
        this.items = data;
        this.filteredItems = data;
    });
	}
}

const goodsList = new GoodsList();
goodsList.fetchData().then(() => {
	goodsList.render();
})
const basketGoods = new BasketGoods();
basketGoods.fetchData();

document.getElementsByClassName('search-button')[0].addEventListener('click', () => {
	const input = document.getElementsByClassName('goods-search')[0].value;
	goodsList.filter(input);
  goodsList.render();
})