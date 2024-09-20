import Select from "react-select";
function AddPostSelect({ datas, body, setBody }) {
  const options = datas.map((item) => ({
    value: item._id,
    label: item.name,
  }));
  const handleChange = (selectedOption) => {
    const newSelectedOptions = selectedOption
      .map((option) => option.value)
      .slice(0, 2);
    setBody({ ...body, category: newSelectedOptions });
  };
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused || state.isSelected ? "#08a284" : "#08a284",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#08a284",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#000",
    }),
    option: (provided) => ({
      ...provided,
      textTransform: "lowercase",
    }),
  };
  return (
    <Select
      options={datas.map((item) => ({
        value: item._id,
        label: item.name,
      }))}
      isMulti
      value={options.filter((option) => body?.category?.includes(option.value))}
      placeholder="Choose Category"
      onChange={handleChange}
      styles={customStyles}
    />
  );
}

export default AddPostSelect;
