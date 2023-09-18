import React, { useEffect, useState } from "react";
import IndianNumber from "../CheckoutPageComponent/IndianNumber";
import Link from "next/link";
import Image from "next/image";

import { useSelector } from "react-redux";
import OrderSummaryModal from "../CheckoutPageComponent/OrderSummaryModal";
import { CONSTANTS } from "../../services/config/app-config";
import { cart_listing_state } from "../../store/slices/cart-listing-page-slice/cart-listing-slice";

const OrderSummary = ({
  orderSummary,
  couponError,
  selectedMultiLangData,
  currencySymbolForSummary,
}: any) => {
  const [cartListingItems, setcartListingItems] = useState<any>([]);
  const [show, setshow] = useState<boolean>(false);
  const [initial, setInitial] = useState<boolean>(false);
  const cartProducts: any = useSelector(cart_listing_state);


  console.log("order Summary", currencySymbolForSummary);


  let order;
  useEffect(() => {
    setcartListingItems(cartProducts.data);
    setInitial(true);
  }, [cartProducts]);
  const handleShow = () => {
    setshow(!show);
  };
  console.log("cartproducts", cartListingItems);
  if (orderSummary?.length > 0) {
    order = orderSummary?.filter(
      (vals: any) =>
        vals?.name !== "Coupon Code" && vals?.name !== "Coupon Amount"
    );
  }
  // console.log(orderSummary, "orderSummary")
  const myLoader = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}${src}?w=${width}&q=${quality || 75}`;
  };

  console.log("ordersummarycurrencySymbolForSummary", currencySymbolForSummary);

  const currencySymbol = cartListingItems?.categories?.length > 0 &&
    cartListingItems?.categories.map((value: any, index: any) => {
      return (
        <span className="product-price">
          {cartListingItems?.categories[0]?.orders[0]?.currency_symbol}
        </span>
      )
    });
    console.log("currencySymbol" , currencySymbol)
  return (
    <div>
      <div >

        { /*{couponError === false
              ? orderSummary?.map((data: any, index: number) => (
                <div className="order-summery px-2 px-sm-0 px-xm-0 products-name mx-2" >
                  <div className="row mb-1 mb-0">
                    <div className="col-6">
                      {data?.name === "Total" ? (
                        <strong className="mb-0 p-0">{data?.name}</strong>
                      ) : (
                        <p className={`mb-0 p-0 summary_p`}>{data?.name}</p>
                      )}
                    </div>
                    <div className="col-6 text-end mt-1">
                      <p className={`mb-0 summary_p`}>
                        {data?.name === "Coupon Code" ? (
                          <p className={`mb-0 cart_p text-end products-price`} > */}
        {/* <i className="fa fa-inr"></i> */}
        {/* {cartListingItems?.categories[0]?.orders[0]?.currency_symbol} */}

        {/* {currencySymbol} */}
        {/* {currencySymbolForSummary}
                            <IndianNumber value={data?.value} />
                          </p>
                        ) : (
                          <div className="products-price"> */}
        {/* {cartListingItems?.categories[0]?.orders[0]?.currency_symbol} */}

        {/* {currencySymbol} */}
        {/* {currencySymbolForSummary}
                            <IndianNumber value={data?.value} />
                          </div>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              // )) */ }

        {!orderSummary ? null : (
          <div>
            {couponError === false
              ? orderSummary?.map((data: any, index: number) => (
                <>
                  {data?.name === "Tax" && (
                    <>
                      <div
                        className="order-summery px-2 px-sm-0 px-xm-0 mx-3 products-name"
                        key={index}
                      >
                        <div className="row mb-1 ">
                          <div className="col-6">{data?.name}</div>
                          <div className="col-6 text-end">
                            <p className={`mb-0 summary_p`}>
                              <div>
                                {currencySymbolForSummary}
                                <IndianNumber value={data?.value} />
                              </div>
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  {data?.value !== 0 && data?.value !== null && (
                    <>
                      <div
                        className="order-summery px-2 px-sm-0 px-xm-0 mx-3 products-name"
                        key={index}
                      >
                        <div className="row mb-1 ">
                          <div className="col-6">
                            {data?.name === "Total" ? (
                              <strong className="mb-0 p-0">
                                {data?.name}
                              </strong>
                            ) : (
                              <p className={`mb-0 p-0 summary_p`}>
                                {data?.name}
                              </p>
                            )}
                          </div>
                          <div className="col-6 text-end">
                            <p className={`mb-0 summary_p`}>
                              {data?.name === "Coupon Code" ? (
                                <div>
                                  <IndianNumber value={data?.value} />
                                </div>
                              ) : (
                                <div>
                                  {currencySymbolForSummary}

                                  <IndianNumber value={data?.value} />
                                </div>
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </>
              ))
              : orderSummary
                .filter(
                  (values: any) =>
                    values?.name !== "Store Credit" &&
                    values?.name !== "Coupon Code" &&
                    values?.name !== "Coupon Amount" &&
                    values?.name !== "Round Off"
                )
                .map((data: any, index: number) => (
                  <>
                  {data?.name === "Tax" && (
                    <>
                      <div
                        className="order-summery px-2 px-sm-0 px-xm-0 mx-3 products-name"
                        key={index}
                      >
                        <div className="row mb-1 ">
                          <div className="col-6">{data?.name}</div>
                          <div className="col-6 text-end">
                            <p className={`mb-0 summary_p`}>
                              <div>
                              {currencySymbol[0]}
                                {/* {currencySymbolForSummary} */}
                                <IndianNumber value={data?.value} />
                              </div>
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  {data?.value !== 0 && data?.value !== null && (
                    <>
                      <div
                        className="order-summery px-2 px-sm-0 px-xm-0 mx-3 products-name"
                        key={index}
                      >
                        <div className="row mb-1 ">
                          <div className="col-7" >
                            {data?.name === "Total" ? (
                              <strong className="mb-0 p-0">
                                {data?.name}
                              </strong>
                            ) : (
                              <p className={`mb-0 p-0 summary_p`}>
                                {data?.name}
                              </p>
                            )}
                          </div>
                          <div className="col-5 text-end">
                            <p className={`mb-0 summary_p`}>
                              {data?.name === "Coupon Code" ? (
                                <div>
                                  <IndianNumber value={data?.value} />
                                </div>
                              ) : (
                                <div>
                                  {/* {currencySymbolForSummary} */}
                                  {currencySymbol[0]}

                                  <IndianNumber value={data?.value} />
                                </div>
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </>
                ))}
          </div>
        )}


      </div>

      <div className="checkout-item mt-5" >
        {cartListingItems?.categories?.length > 0 &&
          cartListingItems?.categories.map((value: any, index: any) => {
            return (
              <>
                <div key={index}>
                  {value?.orders?.length > 0 &&
                    value?.orders?.slice(0, 4).map((data: any, i: any) => {
                      return (
                        <div className="row border mx-2 my-1 " key={i}>
                          <div className="col-4">
                            <div className="checkout-img mt-3">
                              <Image
                                loader={myLoader}
                                src={`${data.image_url}`}
                                className="product_img img-fluid"
                                alt="product image"
                                width={120}
                                height={120}
                              />
                              {/* <h1>{data.currency_symbol}</h1> */}
                            </div>
                          </div>
                          <div className="col-8  products-name ">
                            <div className="checkout_item_details  products-name ">
                              <h6 className="mb-0 product_item_name ">
                                {data.item_name}
                              </h6>
                              <table
                                width="100%"
                                className="mb-0 mt-1 table table-borderless"
                              >
                                <tbody className=" products-name">
                                  {data.details.map(
                                    (detail: any, index: number) => (
                                      <tr
                                        className="item_options   "
                                        key={index}
                                      >
                                        <td
                                          width="50%"
                                          className="px-0 py-0 pb-0  products-name "
                                        >
                                          <p
                                            className={`text-capitalize mb-0 cart_p `}
                                          >
                                            {detail.name === "Model No"
                                              ? "Item Code"
                                              : detail.name}
                                            :
                                          </p>
                                        </td>
                                        <td
                                          width="50%"
                                          className="px-0 py-0 pb-1"
                                        >
                                          <p
                                            className={`text-capitalize mb-0 cart_p text-end`}
                                          >
                                            {detail.name === "Price" ? (
                                              ""
                                            ) : (
                                              ""
                                            )}
                                            <p className={`mb-0 cart_p text-end `}>
                                              {/* <i className="fa fa-inr"></i> */}
                                              {cartListingItems?.categories[0]?.orders[0]
                                                ?.currency_symbol}

                                              <IndianNumber value={data?.amount} />
                                            </p>
                                          </p>
                                        </td>
                                      </tr>
                                    )
                                  )}
                                  <tr className="item_options ">
                                    <td width="50%" className="px-0 py-0 pb-1">
                                      <p className={`mb-0 cart_p`}>
                                        {selectedMultiLangData?.quantity_c}:
                                      </p>
                                    </td>
                                    <td width="50%" className="px-0 py-0 ">
                                      <p className={`mb-0 cart_p text-end`}>
                                        {data.qty}
                                      </p>
                                    </td>
                                  </tr>
                                  <tr className="item_options ">
                                    <td width="50%" className="px-0 py-0 pb-1">
                                      <p className={`mb-0 cart_p`}>
                                        {
                                          selectedMultiLangData?.total_item_price
                                        }
                                        :
                                      </p>
                                    </td>
                                    <td width="50%" className="px-0 py-0 ">
                                      <p className={`mb-0 cart_p text-end   products-name`}>
                                        {/* <i className="fa fa-inr"></i> */}
                                        {cartListingItems?.categories[0]?.orders[0]
                                          ?.currency_symbol}

                                        <IndianNumber value={data?.amount} />
                                      </p>
                                    </td>
                                  </tr>
                                  {/* <tr className="item_options ">
                                    <td width="50%" className="px-0 py-0 ">
                                      <p className={`mb-0 cart_p`}>
                                        {selectedMultiLangData?.total_item_tax}:
                                        :
                                      </p>
                                    </td>
                                    <td width="50%" className="px-0 py-0 ">
                                      <p className={`mb-0 cart_p text-end`}>
                                        <i className="fa fa-inr"></i>

                                        <IndianNumber value={data?.tax} />
                                      </p>
                                    </td>
                                  </tr> */}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                  <p >
                    <Link href="" className="text-center" legacyBehavior>
                      <a
                        className="text-primary viewall_btn"
                        onClick={() => handleShow()}
                      >
                        {cartListingItems?.categories?.length > 0 &&
                          cartListingItems?.categories.map(
                            (value: any, index: any) => (
                              <div key={index}>
                                {value?.orders?.length > 3 && (
                                  <div className="text-center mt-3">
                                    {selectedMultiLangData?.view_all_items}
                                  </div>
                                )}
                              </div>
                            )
                          )}
                      </a>
                    </Link>
                  </p>
                </div>
              </>
            );
          })}
      </div>

      {show ? (



        <OrderSummaryModal
          show={show}
          toHide={handleShow}
          cartListingItems={cartListingItems}
          selectedMultiLangData={selectedMultiLangData}
        />
      ) : null}
    </div>
  );
};

export default OrderSummary;


















