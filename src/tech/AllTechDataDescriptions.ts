import BReverseTech from "@/components/tech/BReverseTech.vue";
import DashAttackTech from "@/components/tech/DashAttackTech.vue";
import DashTech from "@/components/tech/DashTech.vue";
import FallingAerialTech from "@/components/tech/FallingAerialTech.vue";
import FastFallTech from "@/components/tech/FastFallTech.vue";
import FullHopTech from "@/components/tech/FullHopTech.vue";
import RARTech from "@/components/tech/InstantRAR.vue";
import InstantRARTech from "@/components/tech/InstantRAR.vue";
import ACInstantRARTech from "@/components/tech/InstantRAR.vue";
import RapidTurnaroundTech from "@/components/tech/RapidTurnaroundTech.vue";
import RunningJabTech from "@/components/tech/RunningJabTech.vue";
import RunningNeutralAerialTech from "@/components/tech/RunningNeutralAerialTech.vue";
import RunningTiltTech from "@/components/tech/RunningTiltTech.vue";
import ShortHopTech from "@/components/tech/ShortHopTech.vue";
import WalkTech from "@/components/tech/WalkTech.vue";
import { VueConstructor } from "vue";
import { TechId } from "./AllTechMetadata";

import HydroPumpTech from "@/components/tech/character_specific/greninja/HydroPump.vue";

// Note that these component declarations have to be in a different file than
// the tech metadata itself. That's because they end up depending on the tech
// metadata for rendering. It causes a circular dependency to put them in the
// same place.
const allTechDataComponents: Record<TechId, VueConstructor> = {
  "b-reverse": BReverseTech,
  rar: RARTech,
  "instant-rar": InstantRARTech,
  "ac-instant-rar": ACInstantRARTech,
  "dash-attack": DashAttackTech,
  "falling-aerial": FallingAerialTech,
  "running-nair": RunningNeutralAerialTech,
  "fast-fall": FastFallTech,
  "full-hop": FullHopTech,
  "rapid-turnaround": RapidTurnaroundTech,
  "running-jab": RunningJabTech,
  "running-tilt": RunningTiltTech,
  "short-hop": ShortHopTech,
  dash: DashTech,
  walk: WalkTech,

  "greninja-hydro-pump": HydroPumpTech,
  "greninja-da-fair": HydroPumpTech,
  "greninja-da-idj-fair": HydroPumpTech,
  "greninja-da-upsmash": HydroPumpTech,
  "greninja-dtilt-fair": HydroPumpTech,
  "greninja-dtilt-shfair": HydroPumpTech,
};
export default allTechDataComponents;
