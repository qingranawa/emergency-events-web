import { responsibilityRows } from "../../data/mechanisms";

export function ResponsibilityMatrix() {
  return <div className="mechanism-table-wrap responsibility-matrix">
    <table className="mechanism-table">
      <thead><tr>
        <th scope="col">模块</th>
        <th scope="col">主要负责</th>
        <th scope="col">接收什么</th>
        <th scope="col">交给谁</th>
      </tr></thead>
      <tbody>{responsibilityRows.map((row) => <tr key={row.module + row.name}>
        <th scope="row"><span className="matrix-module mono">{row.module}</span><span>{row.name}</span><small>{row.statusText}</small></th>
        <td data-label="主要负责">{row.responsibility}</td>
        <td data-label="接收什么">{row.receives}</td>
        <td data-label="交给谁">{row.handsOff}</td>
      </tr>)}</tbody>
    </table>
  </div>;
}
