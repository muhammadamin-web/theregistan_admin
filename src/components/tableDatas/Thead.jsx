import "./style.scss";
function Thead({ theadDatas }) {
  return (
    <thead>
      <tr>
        {theadDatas.map((data, i) => (
          <th key={i}>{data}</th>
        ))}
      </tr>
    </thead>
  );
}

export default Thead;
