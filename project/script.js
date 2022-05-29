const goods = [
  { title: 'Shirt', price: 150 },
  { title: 'Socks', price: 50 },
  { title: 'Jacket', price: 350 },
  { title: 'Shoes', price: 250 },
];

const BASE_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const GOODS_URL = `${BASE_URL}/catalogData.json`
const BASKET_URL = `${BASE_URL}/getBasket.json`

function service(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send();
  xhr.onload = () => {
    callback(JSON.parse(xhr.response))
  }
}

class GoodsItem {
  constructor({product_name = '', price = 0}) {
    this.title = product_name;
    this.price = price;
  }
	render() {
		return `
			<div class="goods-item">
				<img src="/img/corob.png" alt="">
				<hr>
				<h3>${this.title}</h3>
				<p>${this.price}$</p>
			</div>
		`;
	}
}

class GoodsList {
	items = [];
	fetchData (callback) {
    service(GOODS_URL, (data) => {
      this.items = data;
      callback()
    });
  }
	getSum() {
		return this.items.reduce((prev, { price }) => {
      return prev + price;
    }, 0)
  }
	render() {
		const goods = this.items.map(item => {
			const goodItem = new GoodsItem(item);
			return goodItem.render()
		}).join('');
		document.querySelector('.goods-list').innerHTML = goods;
	}
}

class BasketGoods {
	items = [];
	fetchData () {
		service(BASKET_URL, (data) => {
      this.items = data;
    });
	}
}

const goodsList = new GoodsList();
goodsList.fetchData(() => {
  goodsList.render();
});

const basketGoods = new BasketGoods();
basketGoods.fetchData();