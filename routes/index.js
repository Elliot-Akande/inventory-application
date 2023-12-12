const express = require("express");
const router = express.Router();

const fragrance_controller = require("../controllers/fragranceController");
const brand_controller = require("../controllers/brandController");

/// BRAND ROUTES ///

// GET Brand list page.
router.get("/", brand_controller.brand_list);

// GET request for creating a Brand.
router.get("/brand/create", brand_controller.brand_create_get);

// POST request for creating a Brand.
router.post("/brand/create", brand_controller.brand_create_post);

// GET request to delete a Brand.
router.get("/brand/:id/delete", brand_controller.brand_delete_get);

// POST request to delete a Brand.
router.post("/brand/:id/delete", brand_controller.brand_delete_post);

// GET request to update a Brand.
router.get("/brand/:id/update", brand_controller.brand_update_get);

// POST request to update a Brand.
router.post("/brand/:id/update", brand_controller.brand_update_post);

// GET request for one Brand.
router.get("/brand/:id", brand_controller.brand_detail);

/// FRAGRANCE ROUTES

// GET request for creating a Fragrance.
router.get("/fragrance/create", fragrance_controller.fragrance_create_get);

// POST request for creating a Fragrance.
router.post("/fragrance/create", fragrance_controller.fragrance_create_post);

// GET request to delete a Fragrance.
router.get("/fragrance/:id/delete", fragrance_controller.fragrance_delete_get);

// POST request to delete a Fragrance.
router.post(
  "/fragrance/:id/delete",
  fragrance_controller.fragrance_delete_post
);

// GET request to update a Fragrance.
router.get("/fragrance/:id/update", fragrance_controller.fragrance_update_get);

// POST request to update a Fragrance.
router.post(
  "/fragrance/:id/update",
  fragrance_controller.fragrance_update_post
);

// GET request for one Fragrance.
router.get("/fragrance/:id", fragrance_controller.fragrance_detail);

// GET Fragrance list page.
router.get("/fragrances", fragrance_controller.fragrance_list);

module.exports = router;
