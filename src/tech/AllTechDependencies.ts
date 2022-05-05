import { unreachable, upcast } from "@/utils";
import { TechId, TechVariantOf } from "./AllTechMetadata";

/**
 * A tech is said to depend on another tech if the other tech should be learned
 * before practicing the new tech. For example, short-hop fast-falls should be
 * learned only once short-hops have been learned, so we say that short-hop
 * fast-falls have a dependency on short-hops.
 *
 * Furthermore, a variant of a tech may have specific dependencies on a variant
 * of another tech. For example, short-hopping 1.0 grid unit should be learned
 * only after short-hopping in-place.
 */
export interface TechDependency<T extends TechId> {
  id: T;
  variant: TechVariantOf<T>;
}

/**
 * Helper function to construct a `TechDependency`. TypeScript doesn't have
 * existential types, so we can't annotate the return type for
 * `getTechDependencies` as `Array<TechDependency<*>>`, which means that we
 * need to annotate it with the less informative type
 * `Array<TechDependency<TechId>>`. But that type doesn't statically detect
 * when you return a tech dependency that isn't valid for the given tech ID. So
 * we make sure to only construct dependencies using this function, which
 * *does* verify that.
 */
export function dep<T extends TechId>(
  id: T,
  variant: TechVariantOf<T>,
): TechDependency<T> {
  return { id, variant };
}

export function getTechDependencies<T extends TechId>(
  // tslint:disable-next-line: variable-name
  techId_: T,
  variant: TechVariantOf<T>,
): Array<TechDependency<TechId>> {
  const techId: TechId = upcast(techId_);
  switch (techId) {
    case "walk":
    case "dash":
    case "rapid-turnaround":
    case "ac-instant-rar":
      return [];

    case "running-jab":
    case "dash-attack":
      return [dep("dash", {})];

    case "running-nair":
      return [
        dep("dash", {}),
        dep("short-hop", { facing: "forward", jumpDistance: "0.0" }),
      ];

    case "running-tilt":
      return [dep("dash", {})];
    case "b-reverse":
      return [dep("running-tilt", {})];

    case "short-hop":
    case "full-hop": {
      const { facing, jumpDistance } = variant as TechVariantOf<typeof techId>;
      switch (jumpDistance) {
        case "0.0":
          return [];
        case "0.5":
          return [dep(techId, { facing, jumpDistance: "0.0" })];
        case "1.0":
          return [dep(techId, { facing, jumpDistance: "0.5" })];
        case "1.5":
          return [dep(techId, { facing, jumpDistance: "1.0" })];
        case "2.0":
          return [dep(techId, { facing, jumpDistance: "1.5" })];
        case "2.5":
          return [dep(techId, { facing, jumpDistance: "2.0" })];
        case "max":
          return [dep(techId, { facing, jumpDistance: "0.0" })];
        default:
          return unreachable(jumpDistance, "jumpDistance check is exhaustive");
      }
    }

    case "rar": {
      const { hop } = variant as TechVariantOf<typeof techId>;
      switch (hop) {
        case "short":
          return [
            dep("dash", {}),
            dep("short-hop", { facing: "forward", jumpDistance: "max" }),
          ];
        case "full":
          return [
            dep("dash", {}),
            dep("full-hop", { facing: "forward", jumpDistance: "max" }),
          ];
      }
    }

    case "instant-rar": {
      const { hop } = variant as TechVariantOf<typeof techId>;
      return [dep("rar", { hop })];
    }

    case "fast-fall": {
      const { facing, jumpDistance, hop } = variant as TechVariantOf<
        typeof techId
      >;
      switch (hop) {
        case "short":
          return [dep("short-hop", { facing, jumpDistance })];
        case "full":
          return [dep("full-hop", { facing, jumpDistance })];
        default:
          return unreachable(hop, "hop check is exhaustive");
      }
    }

    // We require *all* jump distances be mastered before adding in falling
    // aerials.
    case "falling-aerial": {
      const { facing, fall, hop } = variant as TechVariantOf<typeof techId>;
      switch (fall) {
        case "normal":
          switch (hop) {
            case "short":
              return [
                dep("short-hop", { facing, jumpDistance: "0.0" }),
                dep("short-hop", { facing, jumpDistance: "0.5" }),
                dep("short-hop", { facing, jumpDistance: "1.0" }),
                dep("short-hop", { facing, jumpDistance: "1.5" }),
                dep("short-hop", { facing, jumpDistance: "2.0" }),
                dep("short-hop", { facing, jumpDistance: "2.5" }),
                dep("short-hop", { facing, jumpDistance: "max" }),
              ];
            case "full":
              return [
                dep("full-hop", { facing, jumpDistance: "0.0" }),
                dep("full-hop", { facing, jumpDistance: "0.5" }),
                dep("full-hop", { facing, jumpDistance: "1.0" }),
                dep("full-hop", { facing, jumpDistance: "1.5" }),
                dep("full-hop", { facing, jumpDistance: "2.0" }),
                dep("full-hop", { facing, jumpDistance: "2.5" }),
                dep("full-hop", { facing, jumpDistance: "max" }),
              ];
            default:
              return unreachable(hop, "hop check is exhaustive");
          }
        case "fast":
          return [
            dep("fast-fall", { facing, hop, jumpDistance: "0.0" }),
            dep("fast-fall", { facing, hop, jumpDistance: "0.5" }),
            dep("fast-fall", { facing, hop, jumpDistance: "1.0" }),
            dep("fast-fall", { facing, hop, jumpDistance: "1.5" }),
            dep("fast-fall", { facing, hop, jumpDistance: "2.0" }),
            dep("fast-fall", { facing, hop, jumpDistance: "2.5" }),
            dep("fast-fall", { facing, hop, jumpDistance: "max" }),
          ];
        default:
          return unreachable(fall, "fall check is exhaustive.");
      }
    }

    case "greninja-hydro-pump":
      return [];

    case "greninja-dtilt-shfair":
    case "greninja-dtilt-fair":
      return [];

    case "greninja-da-upsmash":
    case "greninja-da-fair":
    case "greninja-da-idj-fair":
      return [dep("dash-attack", {})];

    default:
      return unreachable(techId, "techId check is exhaustive");
  }
}
