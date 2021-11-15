class ToyCardComponent {
  static USD_EUR = 0.87;

  constructor(props) {
    this.props = props;
    this.init();
  }

  formatPrice = () => {
    let {
      price: { currency, amount },
      discount: { type, amount: value }
    } = this.props;
    
    amount = currency === '$' ? amount * ToyCardComponent.USD_EUR : amount;
    value = currency === '$' ? value * ToyCardComponent.USD_EUR : value;

    let finalPrice;
    let discountBadge = '';

    if (type === 'amount') {
      finalPrice = amount - value;
      discountBadge = `-${value} €`;
    } else if (type === 'toFixed') {
      finalPrice = value;
    } else {
      finalPrice = amount * (1 - value / 100);
      discountBadge = `-${value} %`;
    }
    
    return `
    <div>
      <span class="text-decoration-line-through fw-light pe-2 text-danger">${Math.round(100 * amount) / 100} €</span>
      <span class="text-success">${Math.round(100 * finalPrice) / 100} € <span class="text-white bg-primary">${discountBadge}</span></span>
    </div>`
  }

  ageRestriction = () => {
    const { ageRestrictions } = this.props
    return ageRestrictions ? `<div>Age: ${ageRestrictions.from}</div>` : ''
  }

  init = () => {
    const { title, imgSrc, onDelete } = this.props
    this.htmlElement = document.createElement('article');
    this.htmlElement.className = 'card p-3 shadow';
    this.htmlElement.innerHTML = `
    <img src="${imgSrc}" class="card-img-top"/ height="300px" style="object-fit: cover">
    <div class="card-body d-flex flex-column">
      <h2 class="h5">${title}</h2>
      <div>
        ${this.formatPrice()}
      </div>
        ${this.ageRestriction()}
    <div class="text-center mt-auto">
      <button class="btn btn-danger">Ištrinti</button>
    </div>
    `
    const btn = this.htmlElement.querySelector('.btn');
    btn.addEventListener('click', onDelete);
  }
}