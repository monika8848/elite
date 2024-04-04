import { useSelector } from "react-redux";
import useProductDetail from "../../hooks/ProductDetailHook/product-detail-hook";
import { SelectedFilterLangDataFromStore } from "../../store/slices/general_slices/selected-multilanguage-slice";
import { Norecord } from "../NoRecord";
import ProductDetailLoadingLayout from "./ProductDetailLoadingLayout";
import BreadCrumbs from "./ProductDetails/BreadCrumbs";
import CheckStockAvailability from "./ProductDetails/CheckStockAvailabilty";
import ProductDetail from "./ProductDetails/ProductDetail";
import ProductItemsOptions from "./ProductDetails/ProductItemsOptions";
import ProductEnlargeImage from "./ProductEnlargeImage";
import ProductSpecificationMaster from "./ProductSpecifications/ProductSpecificationMaster";
import { useEffect, useState } from "react";
import { currency_selector_state } from "../../store/slices/general_slices/multi-currency-slice";

const ProductDetailMaster = () => {
  const {
    productDetailData,
    productVariants,
    selectedVariant,
    thumbnailOfVariants,
    handleVariantSelect,
    productImages,
    handleQuantity,
    handleQuantityIncrement,
    handleQuantityDecrement,
    productQuantity,
    minQty,
    stockAvailabilityTextChanges,
    checkStock,
    handleStockAvail,
    stockAvailability,
    testBtn,
    doesSelectedVariantDoesNotExists,
    stockDoesNotExistsForSelectedVariants,
    productItemOptions,
    productDetailLoading,
  } = useProductDetail();

  const SelectedLangDataFromStore:any = useSelector(
    SelectedFilterLangDataFromStore
  );
  const currency_state_from_redux: any = useSelector(currency_selector_state);
  const [selectedMultiLangData, setSelectedMultiLangData] = useState<any>();

  useEffect(() => {
    if (
      Object.keys(SelectedLangDataFromStore?.selectedLanguageData)?.length > 0
    ) {
      setSelectedMultiLangData(SelectedLangDataFromStore?.selectedLanguageData);
    }
  }, [SelectedLangDataFromStore]);

  // console.log("no product heading set", selectedMultiLangData);
  return (
    <div className="container">
      <div className="container product_detail_container">
        <div className="row">
          <div className="col-12 mt-0">
            <BreadCrumbs />
          </div>
          {productDetailLoading === true ? (
            <div className="row justify-content-center">
              {[...Array(1)].map(() => (
                <>
                  <div className="col-lg-9 mx-auto">
                    <ProductDetailLoadingLayout />
                  </div>
                </>
              ))}
            </div>
          ) : (
            <>
              {productDetailData.hasOwnProperty("name") ? (
                <>
                  <div className="col-lg-6">
                    <ProductEnlargeImage productImages={productImages} />
                  </div>
                  <div className="col-lg-6">
                    <ProductDetail
                      productDetailData={productDetailData}
                      productVariants={productVariants}
                      selectedVariant={selectedVariant}
                      thumbnailOfVariants={thumbnailOfVariants}
                      handleVariantSelect={handleVariantSelect}
                      handleQuantity={handleQuantity}
                      handleQuantityIncrement={handleQuantityIncrement}
                      handleQuantityDecrement={handleQuantityDecrement}
                      productQuantity={productQuantity}
                      minQty={minQty}
                      stockAvailabilityTextChanges={
                        stockAvailabilityTextChanges
                      }
                      handleStockAvail={handleStockAvail}
                      testBtn={testBtn}
                      productDetailLoading={productDetailLoading}
                      doesSelectedVariantDoesNotExists={
                        doesSelectedVariantDoesNotExists
                      }
                      stockDoesNotExistsForSelectedVariants={
                        stockDoesNotExistsForSelectedVariants
                      }
                      SelectedLangDataFromStore={SelectedLangDataFromStore}
                      selectedMultiLangData={selectedMultiLangData}
                    />
                  </div>
                </>
              ) : (
                <Norecord
                  heading={selectedMultiLangData?.product_not_found}
                  content={selectedMultiLangData?.product_not_found_s}
                  selectLangData={selectedMultiLangData}
                />
              )}
            </>
          )}
        </div>

        {checkStock === true && (
          <div className="col-lg-12 mt-5">
            <CheckStockAvailability
              stockAvailability={stockAvailability}
              selectedMultiLangData={selectedMultiLangData}
            />
          </div>
        )}
      </div>
      <div className="mb-2">
        {productDetailData?.prod_specifications?.length > 0 && (
          <ProductSpecificationMaster
            specifications={productDetailData?.prod_specifications}
            selectedMultiLangData={selectedMultiLangData}
          />
        )}
      </div>
      {productItemOptions?.length > 0 &&
        productItemOptions !== null &&
        productItemOptions.map((items: any, index: any) => {
          return (
            <>
              <div key={index}>
                {items?.values?.length > 0 && (
                  <ProductItemsOptions
                    items={items}
                    selectedMultiLangData={selectedMultiLangData}
                    currency_state_from_redux={currency_state_from_redux}
                  />
                )}
              </div>
            </>
          );
        })}
    </div>
  );
};

export default ProductDetailMaster;
