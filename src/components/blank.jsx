import { MuiColorInput } from "mui-color-input";
import AddPostSelect from "./addPostSelect/AddPostSelect.jsx";

const FormInput = ({ id, label, type, onInput, value }) => (
  <div className="input_box">
    <input id={id} onChange={onInput} value={value}  type={type} />
    <label htmlFor={id}>{label}:</label>
  </div>
);

const CheckboxInput = ({ id, label, onChange, checked }) => (
  <div>
    <label htmlFor={id}>{label}:</label>
    <input onChange={onChange} checked={checked} id={id} type="checkbox" />
  </div>
);

const ColorInput = ({ id, label, value, onChange, disabled }) => (
  <div>
    <label htmlFor={id}>{label}:</label>
    <MuiColorInput
      id={id}
      value={value}
      disabled={disabled}
      onChange={onChange}
    />
  </div>
);

const FormInputGroup1 = ({ body, setBody, categories }) => (
  <div className="form_input_div">
    <FormInput
      id="title"
      label="Title"
      type="text"
      onInput={(e) => setBody({ ...body, title: e.target.value })}
      value={body.title}
    />
    <div className="input_box">
      <AddPostSelect datas={categories} body={body} setBody={setBody} />
    </div>
    <FormInput
      id="readTime"
      label="Read Time"
      type="tel"
      onInput={(e) => setBody({ ...body, readTime: e.target.value })}
      value={body.readTime}
    />
    <FormInput
      id="date"
      label="Date"
      type="date"
      onInput={(e) => setBody({ ...body, date: e.target.value })}
      value={body?.date }
    />
  </div>
);

const FormInputGroup2 = ({ body, setBody, changeColor }) => (
  <div className="form_inputs_div">
    <div className="form_input_div2">
      <CheckboxInput
        id="checkBox1"
        label="Default Color"
        onChange={() => {
          setBody({ ...body, isColored: false });
          changeColor();
        }}
        checked={!body.isColored}
      />
      <CheckboxInput
        id="checkBox2"
        label="Change Color"
        onChange={() => setBody({ ...body, isColored: true })}
        checked={body.isColored}
      />
    </div>
    <div className="form_input_div3">
      <ColorInput
        id="colorInput1"
        label="Bg Color"
        value={body.bgColor}
        onChange={(colorValue) => setBody({ ...body, bgColor: colorValue })}
        disabled={!body.isColored}
      />
      <ColorInput
        id="colorInput2"
        label="Text Color"
        value={body.textColor}
        onChange={(colorValue) => setBody({ ...body, textColor: colorValue })}
        disabled={!body.isColored}
      />
    </div>
  </div>
);

export { FormInputGroup1, FormInputGroup2 };
