const {React} = require ("react");
const { render } = require("@testing-library/react");
const { shallow, mount } = require('enzyme');
const { expect } = require('chai');

describe('<Form /> Mounted', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<PokemonDetail />);
  });
  it('El form debe tener un label que diga: "Username:"', () => {
      const { container } = render(<PokemonDetail />)
      const element = container.querySelectorAll('label')[0]
      expect(element.innerHTML).toBe('Username:');
  });

  it('El form debe tener un label que diga: "Password:"', () => {
    const { container } = render(<PokemonDetail />)
    const element = container.querySelectorAll('label')[1]
    expect(element.innerHTML).toBe('Password:');
  });
})