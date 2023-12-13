const Fragrance = require("../models/fragrance");
const asyncHandler = require("express-async-handler");

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
  res.send("NOT IMPLEMENTED: Fragrance create GET");
});

// Handle Fragrance create on POST.
exports.fragrance_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Fragrance create POST");
});

// Display Fragrance delete form on GET.
exports.fragrance_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Fragrance delete GET");
});

// Handle Fragrance delete on POST.
exports.fragrance_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Fragrance delete POST");
});

// Display Fragrance update form on GET.
exports.fragrance_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Fragrance update GET");
});

// Handle Fragrance update on POST.
exports.fragrance_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Fragrance update POST");
});
