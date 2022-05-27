const goods = [
  { title: 'Shirt', price: 150 },
  { title: 'Socks', price: 50 },
  { title: 'Jacket', price: 350 },
  { title: 'Shoes', price: 250 },
];

const renderGoodsItem = ({title = '', price = 0}) => {
  return `
    <div class="goods-item">
			<img src="/img/corob.png" alt="">
      <h3>${title}</h3>
      <p>${price}</p>
    </div>
  `;
};

//Запятые между блоками можно убрать с помощью метода .join, они появляются, т.к.
//стандартный знак, разделяющий значения массива это ",".
const renderGoodsList = (list = []) => {
  let goodsList = list.map(item => renderGoodsItem(item)).join('');
  document.querySelector('.goods-list').innerHTML = goodsList;
}

renderGoodsList(goods);