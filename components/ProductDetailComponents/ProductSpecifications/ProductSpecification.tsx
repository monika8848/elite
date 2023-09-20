import React from "react";

const ProductSpecification = ({ specificationData }: any) => {
  console.log("specification data", specificationData);
  return (
    <>
      <div className="container" >
        <div className="row">
          {specificationData?.values?.length > 0 &&
            specificationData?.values.map((items: any, index: any) => {
              return (
                <div key={index} className="col-lg-6">
                  <table className="table">
                    <div className="row">
                      <div className="col-lg-4 bold  item_names_web1 color-black" >{items.name}</div>
                      <div className="col-lg-8 pl-1 color-black">{items.values}</div>
                    </div>
                  </table>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default ProductSpecification;
