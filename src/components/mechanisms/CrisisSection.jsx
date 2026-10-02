import { crisisFacts } from "../../data/mechanisms";

const labels = {
  BIO: "生物危机",
  SYS: "系统危机",
  CON: "收容危机",
  SEC: "安全危机",
  GOI: "第三方组织",
  WAR: "核武危机",
  END: "终局状态",
};

export function CrisisSection() {
  return <div className="crisis-system">
    <div className="mechanism-table-wrap crisis-table-wrap">
      <table className="mechanism-table crisis-table">
        <thead><tr>
          <th scope="col">危机</th>
          <th scope="col">含义</th>
          <th scope="col">什么时候触发</th>
          <th scope="col">当前作用</th>
        </tr></thead>
        <tbody>{crisisFacts.map((fact) => <tr key={fact.tag}>
          <th scope="row"><span className="crisis-tag-code mono">{fact.tag}</span><span>{labels[fact.tag]}</span></th>
          <td data-label="含义">{fact.signal}</td>
          <td data-label="什么时候触发">{fact.rule}</td>
          <td data-label="当前作用">{fact.note}</td>
        </tr>)}</tbody>
      </table>
    </div>
    <p className="crisis-episode-note">同一场连续危机会维持同一个危机阶段，解除后再次出现才会视为新的阶段。</p>
    <p className="crisis-separation-note"><b>危机系统负责识别当前威胁。</b> D-LRC 负责计算响应等级；事件调度再根据两者判断哪些事件计划符合条件。</p>
  </div>;
}
