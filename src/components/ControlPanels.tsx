
const ControlPanels = () => {
  return (
    <div>
      <button>Add Product</button>
      <input type="text" placeholder="Search Product" />
      <select>
        <option value="all">All</option>
        <option value="name">Name</option>
        <option value="price">Price</option>
        <option value="recent">Recently Added</option>
        <option value="oldest">Oldest Added</option>
      </select>
    </div>
  );
};

export default ControlPanels;
