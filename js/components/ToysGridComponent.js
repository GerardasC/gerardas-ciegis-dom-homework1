class ToysGridComponent {
  constructor() {
    this.state = {
      loading: false,
      toys: []
    }
    this.init();
  }

  
  fetchToys = () => setTimeout ( () => {
    
    return API.fetchToys(
      (toys) => {
        this.state.loading = false;
        this.saveToys(toys);
      },
      (err) => {
        alert(err);
        this.state.loading = false;
        this.render();
      }
    );
 },1000)


  saveToys = (toys) => {
    this.state.toys = toys;
    this.state.loading = false;
    this.render();
  }

  deleteToy = (id) => {
    API.deleteToy(
      id,
      () => API.fetchToys(this.saveToys, alert),
      alert
    )
  }
  
  init = () => {
    this.state.loading = true;
    this.fetchToys();
    this.htmlElement = document.createElement('div');
    this.htmlElement.className = 'row g-3';
    this.render();
  }

  wrapInColumn = (element) => {
    const column = document.createElement('div');
    column.className = 'col-12 col-sm-6 col-lg-4 col-xl-3 d-flex align-items-stretch';
    column.appendChild(element);
    return column;
  }

  render = () => {
    const {loading, toys} = this.state;
    if (loading) {
      this.htmlElement.innerHTML = '<div class="text-center"><img src="assets/loading.gif"/></div>'
    } else if (toys.length > 0) {
      this.htmlElement.innerHTML = '';
      const toyElements = toys
        .map(({ id, ...props }) => new ToyCardComponent({
          ...props,
          onDelete: () => this.deleteToy(id)
        }))
        .map(x => x.htmlElement)
        .map(this.wrapInColumn);

        this.htmlElement.append(...toyElements);
    } else {
      this.htmlElement.innerHTML = `<h2>Šiuo metu žaislų neturime</h2>`;
    }
  }

}