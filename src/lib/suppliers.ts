import data from '../data/suppliers.json';

export type RegionId = 'manawatu' | 'kapiti' | 'wellington' | 'wairarapa';

export interface Supplier {
  name: string;
  address: string[];
  phone: string;
  website?: string;
  lat: number;
  lng: number;
  approx?: boolean;
}

export interface Location {
  slug: string;
  town: string;
  region: RegionId;
  suppliers: Supplier[];
}

/** A supplier with its location context, as passed to the map. */
export interface MapPoint extends Supplier {
  id: string;
  slug: string;
  town: string;
  region: RegionId;
}

export const regions = data.regions as { id: RegionId; name: string }[];
export const locations = data.locations as Location[];
export const regionName = (id: RegionId) => regions.find((r) => r.id === id)?.name ?? id;

export const toPoints = (locs: Location[]): MapPoint[] =>
  locs.flatMap((loc) =>
    loc.suppliers.map((s, i) => ({ ...s, id: `${loc.slug}-${i}`, slug: loc.slug, town: loc.town, region: loc.region })),
  );

/** NZ local number -> tel: URI, e.g. "06 929 4002" -> "tel:+6469294002". */
export const telHref = (phone: string) => `tel:+64${phone.replace(/\D/g, '').replace(/^0/, '')}`;
