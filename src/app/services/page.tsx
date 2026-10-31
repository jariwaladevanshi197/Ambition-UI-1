import { loadSections, renderSections } from "@/components/cms/renderSections";
import {
  ServicesHero, ServicesGrid, CoalProducts, PortOperations, MineralProducts, SaltProducts,
} from "@/components/services/ServicesSections";
import { getProducts } from "@/lib/cms/server";
import { SERVICES_SECTIONS } from "@/content/services";
import { DEFAULT_PRODUCTS } from "@/content/products";

export default async function ServicesPage() {
  const [sections, loaded] = await Promise.all([loadSections("/services", SERVICES_SECTIONS), getProducts()]);
  const products = loaded ?? DEFAULT_PRODUCTS.map((p, i) => ({ ...p, id: `default-product-${i}` }));
  const inCategory = (c: string) => products.filter(p => p.category === c);

  return renderSections(sections, {
    "Services Hero":   s => <ServicesHero section={s} />,
    "Services Grid":   s => <ServicesGrid section={s} />,
    "Coal Products":   s => <CoalProducts section={s} products={inCategory("Coal")} />,
    "Port Operations": s => <PortOperations section={s} />,
    "Minerals (sourced from Zimbabwe, Kenya, Mozambique)": s => <MineralProducts section={s} products={inCategory("Minerals")} />,
    "Salt Products":   s => <SaltProducts section={s} products={inCategory("Salt")} />,
  });
}
