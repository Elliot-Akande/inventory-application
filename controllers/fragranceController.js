const Fragrance = require("../models/fragrance");
const Brand = require("../models/brand");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display list of all Fragrances.
exports.fragrance_list = asyncHandler(async (req, res, next) => {
  const allFragrances = await Fragrance.find()
    .sort({ name: 1 })
    .populate("brand")
    .exec();

  res.render("fragrance_list", {
    title: "All Fragrances",
    fragrance_list: allFragrances,
  });
});

// Display detail page for specific Fragrance.
exports.fragrance_detail = asyncHandler(async (req, res, next) => {
  const fragrance = await Fragrance.findById(req.params.id)
    .populate("brand")
    .orFail(() => {
      const err = new Error("Fragrance not found");
      err.status = 404;
      return next(err);
    })
    .exec();

  res.render("fragrance_detail", {
    title: "Fragrance Detail",
    fragrance,
  });
});

// Display Fragrance create form on GET.
exports.fragrance_create_get = asyncHandler(async (req, res, next) => {
  const allBrands = await Brand.find().sort({ name: 1 }).exec();

  res.render("fragrance_form", {
    title: "Create Fragrance",
    brands: allBrands,
  });
});

// Handle Fragrance create on POST.
exports.fragrance_create_post = [
  body("name", "Name must be present.").trim().isLength({ min: 1 }).escape(),
  body("description", "Description must be present.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("brand", "Brand must be present.").trim().isLength({ min: 1 }).escape(),
  body("number_in_stock", "Number_in_stock must be present.")
    .trim()
    .isLength({ min: 1 })
    .isInt({ min: 0 })
    .withMessage("Number_in_stock must be a number more than or equal to 0")
    .escape(),
  body("price", "Price must be present.")
    .trim()
    .isLength({ min: 1 })
    .isCurrency()
    .withMessage(
      "Price must be a valid currency value (100, 100.00, 100,000.00 etc.)."
    )
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const fragrance = new Fragrance({
      name: req.body.name,
      description: req.body.description,
      brand: req.body.brand,
      number_in_stock: req.body.number_in_stock,
      price: req.body.price,
    });

    if (!errors.isEmpty()) {
      const allBrands = await Brand.find().sort({ name: 1 }).exec();
      res.render("fragrance_form", {
        title: "Create Fragrance",
        brands: allBrands,
        errors: errors.toArray(),
        fragrance,
      });
      return;
    }

    await fragrance.save();
    res.redirect(fragrance.url);
  }),
];

// Display Fragrance delete form on GET.
exports.fragrance_delete_get = asyncHandler(async (req, res, next) => {
  const fragrance = await Fragrance.findById(req.params.id).exec();

  if (fragrance === null) {
    res.redirect("/fragrances");
  }

  res.render("fragrance_delete", { title: "Delete Fragrance", fragrance });
});

// Handle Fragrance delete on POST.
exports.fragrance_delete_post = asyncHandler(async (req, res, next) => {
  await Fragrance.findByIdAndDelete(req.body.fragranceid);
  res.redirect("/fragrances");
});

// Display Fragrance update form on GET.
exports.fragrance_update_get = asyncHandler(async (req, res, next) => {
  const [fragrance, allBrands] = await Promise.all([
    Fragrance.findById(req.params.id)
      .orFail(() => {
        const err = new Error("Fragrance not found");
        err.status = 404;
        return next(err);
      })
      .exec(),
    Brand.find().sort({ name: 1 }).exec(),
  ]);

  res.render("fragrance_form", {
    title: "Update Fragrance",
    brands: allBrands,
    fragrance,
  });
});

// Handle Fragrance update on POST.
exports.fragrance_update_post = [
  body("name", "Name must be present.").trim().isLength({ min: 1 }).escape(),
  body("description", "Description must be present.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("brand", "Brand must be present.").trim().isLength({ min: 1 }).escape(),
  body("number_in_stock", "Number_in_stock must be present.")
    .trim()
    .isLength({ min: 1 })
    .isInt({ min: 0 })
    .withMessage("Number_in_stock must be a number more than or equal to 0")
    .escape(),
  body("price", "Price must be present.")
    .trim()
    .isLength({ min: 1 })
    .isCurrency()
    .withMessage(
      "Price must be a valid currency value (100, 100.00, 100,000.00 etc.)."
    )
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const fragrance = new Fragrance({
      name: req.body.name,
      description: req.body.description,
      brand: req.body.brand,
      number_in_stock: req.body.number_in_stock,
      price: req.body.price,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      const allBrands = await Brand.find().sort({ name: 1 }).exec();
      res.render("fragrance_form", {
        title: "Update Fragrance",
        brands: allBrands,
        errors: errors.toArray(),
        fragrance,
      });
      return;
    }

    const updatedFragrance = await Fragrance.findByIdAndUpdate(
      req.params.id,
      fragrance,
      {}
    );
    res.redirect(updatedFragrance.url);
  }),
];
