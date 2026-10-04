import { OpeningRoleAllocation } from "./OpeningRoleAllocation";
import { ScpAugmentationSection } from "./ScpAugmentationSection";
import { M07SharedSystems } from "./M07SharedSystems";
import { WorldEffectSection } from "./WorldEffectSection";

export function GameplayLayerSection() {
  return <div className="gameplay-layer-section">
    <div className="gameplay-layer-intro">
      <span className="mono">M07 · GAMEPLAY LAYER</span>
      <h3>开局具体身份与玩家能力运行</h3>
      <p>M07 使用 M01 在 Round Start 锁定的 Composition slots，分配具体 opening identities；进入游戏后管理共用的 Variant、SCP enhancement、abilities、HUD、Badge 与 WorldEffect。Event Pack 则定义与某个事件绑定的执行内容和目标。</p>
    </div>
    <OpeningRoleAllocation />
    <ScpAugmentationSection />
    <M07SharedSystems />
    <WorldEffectSection />
  </div>;
}
