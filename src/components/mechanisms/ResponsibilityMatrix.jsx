import { responsibilityRows } from "../../data/mechanisms";

function StatusTags({ status }) {
  return <div className="status-tag-list">{status.map((label) => <span className="status-tag" key={label}>{label}</span>)}</div>;
}

export function ResponsibilityMatrix() {
  return <div className="mechanism-table-wrap responsibility-matrix" tabIndex="0" aria-label="职责矩阵，可横向滚动">
    <table className="mechanism-table">
      <thead><tr>
        <th scope="col">模块</th>
        <th scope="col">负责范围</th>
        <th scope="col">接收信息</th>
        <th scope="col">输出结果</th>
        <th scope="col">不负责</th>
        <th scope="col">状态</th>
      </tr></thead>
      <tbody>{responsibilityRows.map((row) => <tr key={row.module + row.name}>
        <th scope="row"><span className="matrix-module mono">{row.module}</span><span>{row.name}</span></th>
        <td>{row.owns}</td>
        <td>{row.consumes}</td>
        <td>{row.produces}</td>
        <td>{row.excludes}</td>
        <td><StatusTags status={row.status} /></td>
      </tr>)}</tbody>
    </table>
  </div>;
}
