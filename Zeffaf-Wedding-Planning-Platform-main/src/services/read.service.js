import { supabase } from "./supabase";

export const readService = {
  /* =======================
     CATEGORIES
  ======================= */
  categories: async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("id");

    if (error) throw error;
    return data;
  },

  /* =======================
     ITEMS BY CATEGORY
     (vendors OR products)
  ======================= */
  itemsByCategory: async (categorySlug) => {
    const { data: cats, error: catError } = await supabase
      .from("categories")
      .select("*")
      .eq("slug", categorySlug)
      .limit(1);

    if (catError || !cats?.length) return [];

    const category = cats[0];

    // PRODUCTS
  if (category.source === "products") {
  const categoryId = Number(category.id)

  if (Number.isNaN(categoryId)) return []

  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      product_images(image_url)
    `)
    .eq("category_id", categoryId)

  if (error) throw error
  return data || []
}


    // VENDORS
    const { data, error } = await supabase
      .from("vendors")
      .select(`
        *,
        vendor_images(image_url),
        vendor_reviews(rate),
        vendor_available_dates(available_date)
      `)
      .eq("category_id", category.id);

    if (error) throw error;

    return (data || []).map((vendor) => {
      const reviews = vendor.vendor_reviews || [];
      const avgRating = reviews.length
        ? reviews.reduce((s, r) => s + r.rate, 0) / reviews.length
        : vendor.rating || 0;

      return {
        ...vendor,
        rating: avgRating,
      };
    });
  },

  /* =======================
     ALL ITEMS (SHOP HOME)
  ======================= */
  allItems: async () => {
    const { data: categories } = await supabase
      .from("categories")
      .select("id, source");

    if (!categories) return [];

    const vendorCategoryIds = categories
      .filter(c => c.source === "vendors")
      .map(c => c.id);

    const productCategoryIds = categories
      .filter(c => c.source === "products")
      .map(c => c.id);

    const [vendorsRes, productsRes] = await Promise.all([
      supabase
        .from("vendors")
        .select(`
          *,
          vendor_images(image_url),
          vendor_reviews(rate)
        `)
        .in("category_id", vendorCategoryIds),

      supabase
        .from("products")
        .select(`
          *,
          product_images(image_url)
        `)
        .in("category_id", productCategoryIds),
    ]);

    const vendors = (vendorsRes.data || []).map(v => ({
      ...v,
      _type: "vendor",
    }));

    const products = (productsRes.data || []).map(p => ({
      ...p,
      _type: "product",
    }));

    return [...vendors, ...products];
  },
};
