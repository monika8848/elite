import { useEffect, useState } from "react";
import useMultiLingual from "../../../hooks/LanguageHook/multilingual-hook";
import { FiltersViewProps } from "../../../interfaces/filters-view-interface";
import FiltersLoadingLayout from "./FiltersLoadingLayout";
import { CONSTANTS } from "../../../services/config/app-config";
import MissingPartsModal from "../MissingPartsModal";

const WebFilters = (props: FiltersViewProps) => {
  const {
    filtersData,
    loading,
    selectedFilters,
    handleApplyFilters,
    productListingData,
    SelectedLangDataFromStore,
    selectLangData,
  } = props;

  const [filterLang, setFilterLang] = useState<string>("");

  const languageData :any = useMultiLingual();

  const [showMissingPartsModal, setShowMissingPartsModal] = useState<boolean>(false);

  const handleMissingPartsModalClose = () => {
    setShowMissingPartsModal(false);
  };
  useEffect(() => {
    if (Object.keys(languageData)?.length > 0) {
      setFilterLang(languageData?.products);
    }
  }, [languageData]);
  return (
    <div className=" "  >
      <div className="col-md-12 col-12 mt-0 webfilter-sub-container" >
        {CONSTANTS.ENABLE_MISSING_PARTS && productListingData.length > 0 && (
          <>
            <span className="products-name">{selectLangData?.looking_for_something_specific}</span>
            <button
              onClick={() => {
                setShowMissingPartsModal(true);
              }}
              className="missing_parts_btn ps-0 product-font-family ms-2"
            >
              {selectLangData?.let_us_know}
            </button>
          </>
        )}
      </div>

      {/* <div
        className={` ${
          filtersData?.length > 0 ? "clear_filter mb-2" : "d-none"
        }`}
      >
        <a
        
          href="#"
          className="clear_filter_link"
        >
          {SelectedLangDataFromStore?.selectedLanguageData?.clear_filter}
        </a>
      </div> */}

      <div className="filter_section" >
        <div className="filter_block">
          <div className="accordion accordion_custom" id="myAccordion">
            {loading ? (
              <div className="row justify-content-center">
                {[...Array(10)].map(() => (
                  <>
                    <div className="col-lg-12 mx-3">
                      <FiltersLoadingLayout />
                    </div>
                  </>
                ))}
              </div>
            ) : filtersData?.length > 0 ? (
              filtersData?.map((filter: any, index: any) => {
                return (
                  <div
                    className="accordion-item accordion_item_custom"
                    key={index}
                  >
                    <h2
                      className="accordion-header bold filter_heading"
                      id={"heading" + index}
                    >
                      <button
                        type="button"
                        className="text-uppercase accordion-button bold accordion_btn_custom"
                        data-bs-toggle="collapse"
                        data-bs-target={"#collapse" + index}
                        aria-expanded={index === 0 ? "true" : "false"}
                        aria-controls={"collapse" + index}
                      >
                        {filter?.section}
                      </button>
                    </h2>

                    <div
                      id={"collapse" + index}
                      className={
                        index === 0
                          ? "accordion-collapse collapse custom_collapse_css show "
                          : "accordion-collapse custom_collapse_css collapsed"
                      }
                      aria-labelledby={"heading" + index}
                    >
                      <div className="card-body p-0 checkbox-wrapper product-font-family">
                        {filter.values.map(
                          (filterValue: any, innerIndex: any) => (
                            <div className="form_check_filter checkbox-line-height d-flex align-items-center products-name" key={innerIndex}>
                              <input
                                type="checkbox"
                                name={filter.section}
                                value={filterValue}
                                checked={selectedFilters.some(
                                  (selectedFilter: any) =>
                                    selectedFilter.name === filter.section &&
                                    selectedFilter.value.includes(filterValue)
                                )}
                                onChange={handleApplyFilters}
                              />
                              <label
                                className="form-check-label filter-label accordion-checkbox products-name"
                                htmlFor="flexCheckDefault"
                              >
                                {filterValue}
                              </label>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <MissingPartsModal
        show={showMissingPartsModal}
        handlemodalclose={handleMissingPartsModalClose}
        setShow={setShowMissingPartsModal}
        selectLangData={selectLangData}
      />
    </div>
  );
};

export default WebFilters;
