const Brand = require("../models/brand");
const Fragrance = require("../models/fragrance");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display list of all Brands.
exports.brand_list = asyncHandler(async (req, res, next) => {
  const allBrands = await Brand.find().sort({ name: 1 }).exec();

  res.render("brand_list", {
    title: "Fragrance Finder Home",
    brand_list: allBrands,
  });
});

// Display detail page for specific Brand.
exports.brand_detail = asyncHandler(async (req, res, next) => {
  const [brand, allFragrancesOfBrand] = await Promise.all([
    Brand.findById(req.params.id)
      .orFail(() => {
        const err = new Error("Brand not found");
        err.status = 404;
        return next(err);
      })
      .exec(),
    Fragrance.find({ brand: req.params.id }).sort({ name: 1 }).exec(),
  ]);

  res.render("brand_detail", {
    title: "Brand Detail",
    brand_fragrances: allFragrancesOfBrand,
    brand,
  });
});

// Display Brand create form on GET.
exports.brand_create_get = asyncHandler(async (req, res, next) => {
  res.render("brand_form", { title: "Create Brand" });
});

// Handle Brand create on POST.
exports.brand_create_post = [
  body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("description", "Description must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const brand = new Brand({
      name: req.body.name,
      description: req.body.description,
    });

    if (!errors.isEmpty()) {
      res.render("brand_form", {
        title: "Create Brand",
        errors: errors.array(),
        brand,
      });
      return;
    }

    await brand.save();
    res.redirect(brand.url);
  }),
];

// Display Brand delete form on GET.
exports.brand_delete_get = asyncHandler(async (req, res, next) => {
  const [brand, allFragrancesOfBrand] = await Promise.all([
    Brand.findById(req.params.id).exec(),
    Fragrance.find({ brand: req.params.id }, "name description").exec(),
  ]);

  if (brand === null) {
    res.redirect("/");
  }

  res.render("brand_delete", {
    title: "Delete Brand",
    brand_fragrances: allFragrancesOfBrand,
    brand,
  });
});

// Handle Brand delete on POST.
exports.brand_delete_post = asyncHandler(async (req, res, next) => {
  const [brand, allFragrancesOfBrand] = await Promise.all([
    Brand.findById(req.params.id).exec(),
    Fragrance.find({ brand: req.params.id }, "name description").exec(),
  ]);

  if (allFragrancesOfBrand.length > 0) {
    res.render("brand_delete", {
      title: "Delete Brand",
      brand_fragrances: allFragrancesOfBrand,
      brand,
    });
    return;
  }

  await Brand.findByIdAndDelete(req.body.brandid);
  res.redirect("/");
});

// Display Brand update form on GET.
exports.brand_update_get = asyncHandler(async (req, res, next) => {
  const brand = await Brand.findById(req.params.id)
    .orFail(() => {
      const err = new Error("Brand not found");
      err.status = 404;
      return next(err);
    })
    .exec();

  res.render("brand_form", { title: "Update Brand", brand });
});

// Handle Brand update on POST.
exports.brand_update_post = [
  body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("description", "Description must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const brand = new Brand({
      name: req.body.name,
      description: req.body.description,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      res.render("brand_form", {
        title: "Update Brand",
        errors: errors.array(),
        brand,
      });
      return;
    }

    const updatedBrand = await Brand.findByIdAndUpdate(
      req.params.id,
      brand,
      {}
    );
    res.redirect(updatedBrand.url);
  }),
];
