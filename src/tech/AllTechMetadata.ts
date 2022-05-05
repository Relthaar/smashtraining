import { unreachable, upcast } from "@/utils";
import { AllTechVariants, TechMetadata } from "./TechMetadata";

const allTechMetadata = {
  walk: {
    name: "Walk",
    games: {
      ssbu: {},
    },
    variants: {},
  },
  dash: {
    name: "Dash",
    games: {
      ssbu: {},
    },
    variants: {},
  },
  "rapid-turnaround": {
    name: "Rapid turnaround",
    games: {
      ssbu: {},
    },
    variants: {},
  },
  "running-jab": {
    name: "Running jab",
    games: {
      ssbu: {},
    },
    variants: {},
  },
  "dash-attack": {
    name: "Dash attack",
    games: {
      ssbu: {},
    },
    variants: {},
  },
  "running-nair": {
    name: "Running neutral-aerial",
    games: {
      ssbu: {},
    },
    variants: {},
  },
  "b-reverse": {
    name: "B-reverse",
    games: {
      ssbu: {},
    },
    variants: {},
  },
  rar: {
    name: "Reverse Aerial Rush",
    games: { ssbu: {} },
    variants: {
      hop: true,
    },
  },
  "instant-rar": {
    name: "Instant RAR",
    games: { ssbu: {} },
    variants: {
      hop: true,
    },
  },
  "ac-instant-rar": {
    name: "Attack cancelled instant RAR",
    games: { ssbu: {} },
    variants: {},
  },
  "full-hop": {
    name: "Full hop",
    games: {
      ssbu: {},
    },
    variants: {
      facing: true,
      jumpDistance: true,
    },
    excludeVariants: [
      { facing: "backward" as const, jumpDistance: "0.0" as const },
    ],
  },
  "running-tilt": {
    name: "Running tilt",
    games: {
      ssbu: {},
    },
    variants: {},
  },
  "short-hop": {
    name: "Short hop",
    games: {
      ssbu: {},
    },
    variants: {
      facing: true,
      jumpDistance: true,
    },
    excludeVariants: [
      { facing: "backward" as const, jumpDistance: "0.0" as const },
    ],
  },
  "fast-fall": {
    name: "Fast-fall",
    games: {
      ssbu: {},
    },
    variants: {
      facing: true,
      hop: true,
      jumpDistance: true,
    },
  },
  "falling-aerial": {
    name: "Falling aerial",
    games: {
      ssbu: {},
    },
    variants: {
      aerialType: true,
      facing: true,
      fall: true,
      hop: true,
      jumpDistance: true,
    },
  },
  // Greninja
  "greninja-hydro-pump": {
    name: "Hydro Pump",
    character: "greninja",
    games: {
      ssbu: {},
    },
    variants: {},
  },
  "greninja-da-upsmash": {
    name: "DA -> U-smash",
    character: "greninja",
    games: {
      ssbu: {},
    },
    variants: {},
  },
  "greninja-da-fair": {
    name: "DA -> F-air",
    character: "greninja",
    games: {
      ssbu: {},
    },
    variants: {},
  },
  "greninja-da-idj-fair": {
    name: "DA -> IDJ -> F-air",
    character: "greninja",
    games: {
      ssbu: {},
    },
    variants: {},
  },
  "greninja-dtilt-shfair": {
    name: "D-tilt -> SH F-air",
    character: "greninja",
    games: {
      ssbu: {},
    },
    variants: {},
  },
  "greninja-dtilt-fair": {
    name: "D-tilt -> FH F-air",
    character: "greninja",
    games: {
      ssbu: {},
    },
    variants: {},
  },
};

export type TechId = keyof typeof allTechMetadata;
const exportedAllTechMetadata: Record<TechId, TechMetadata> = allTechMetadata;
export default exportedAllTechMetadata;
export type AllTechMetadata = typeof allTechMetadata;

export function getTechMetadata(
  techIdString: string,
): { techId: TechId; metadata: TechMetadata } | null {
  if (allTechMetadata.hasOwnProperty(techIdString)) {
    const techId = techIdString as TechId;
    const metadata: TechMetadata = allTechMetadata[techId];
    return {
      techId,
      metadata,
    };
  } else {
    return null;
  }
}

export type TechVariantOf<T extends TechId> = {
  // @ts-ignore "Type 'x' cannot be used to index type 'AllTechVariants'."
  // Strangely, the correct type is calculated here anyways, and can be used for
  // exhaustiveness-checking later.
  [x in keyof AllTechMetadata[T]["variants"]]: AllTechVariants[x];
};

export type SerializedTechVariant = string;

export function serializeTechVariant<T extends TechId>(
  techId: T,
  techVariant: TechVariantOf<T>,
): SerializedTechVariant {
  // From https://stackoverflow.com/a/16168003/344643
  const serialize = (value: {}) =>
    JSON.stringify(value, Object.keys(value).sort());
  return `${techId}-${serialize(techVariant)}`;
}
