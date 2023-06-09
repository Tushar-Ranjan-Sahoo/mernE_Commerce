const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");





//create product
exports.createProduct = catchAsyncErrors(async (req, res, next) => {

  const product = await Product.create(req.body);

  res.status(201).json({
      success: true,
      product
    }
    );
  });


// get all products
exports.getAllproducts=  catchAsyncErrors(async (req, res, next) => {
   
  const resultPerPage = 5;
  const productCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage);
    const productss = await apiFeature.query;

    res.status(200).json({
        success: true,
        productss
    }); 
});


//update product -- admin

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
  
      if (!product) {
        return next(new ErrorHander("product not found",404));
      }
  
      res.status(200).json({
        success: true,
        data: product,
        productCount,

      });
    } catch (error) {
      next(error);
    }
  });


  exports.getProductDetainls = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHander("product not found",404));
    }
    res.status(200).json({
      success:true,
      product
    })

  });

  exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if(!product) {
      return next(new ErrorHander("product not found",404));
    }
    await product.deleteOne();
    res.status(200).json({
        success:true,
        message:"product deleted successfully"
    })
});


  