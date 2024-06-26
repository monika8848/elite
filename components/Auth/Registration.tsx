import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import { Form, FormLabel } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { RegistrationValidation } from "../../validation/registrationValidation";
import Image from "next/image";
import { register_details } from "../dataSets/registrationDataset";
import { getRegistrationData } from "../../store/slices/auth/registration_slice";
import {
  FetchCitiesForAddressForm,
  FetchStateForAddressForm,
} from "../../services/api/general_apis/customer-form-data-api";
import { SelectedFilterLangDataFromStore } from "../../store/slices/general_slices/selected-multilanguage-slice";
import { get_access_token } from "../../store/slices/auth/token-login-slice";
import logoImg from "../../public/assets/images/b2c_logo.png"
import useMultilangHook from "../../hooks/LanguageHook/Multilanguages-hook";
import RegistrationApi from "../../services/api/auth/registration_api";
import { successmsg } from "../../store/slices/general_slices/toast_notification_slice";
import { hideToast } from "../../store/slices/general_slices/toast_notification_slice";
import { failmsg } from "../../store/slices/general_slices/toast_notification_slice";
import { showToast } from "../ToastNotificationNew";

const Registration = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isPasswordRevealed, setIsPasswordRevealed] = useState<boolean>(false);
  const [isConfirmPasswordRevealed, setIsConfirmPasswordRevealed] = useState<boolean>(false)
  const TokenFromStore: any = useSelector(get_access_token);

  const SelectedLangDataFromStore: any = useSelector(
    SelectedFilterLangDataFromStore
  );
  const [selectedMultiLangData, setSelectedMultiLangData] = useState<any>();
  useEffect(() => {
    if (
      Object.keys(SelectedLangDataFromStore?.selectedLanguageData)?.length > 0
    ) {
      setSelectedMultiLangData(SelectedLangDataFromStore?.selectedLanguageData);
    }
  }, [SelectedLangDataFromStore]);
  console.log("register details", register_details);
  let [selectedCity, setSelectedCity] = useState<any>("");
  let [selectedStates, setSelectedStates] = useState<any>("");
  const { handleLanguageChange, multiLanguagesData }: any = useMultilangHook();

  let [city, setCity] = useState<any>([]);
  const [err, setErr] = useState<boolean>(false);
  let [state, setState] = useState<any>([]);

  useEffect(() => {
    const getStateData: any = async () => {
      const stateData: any = await FetchStateForAddressForm(
        TokenFromStore?.token
      );
      if (stateData?.length > 0) {
        let stateValues: any = stateData
          .map((item: any) => item?.name)
          .filter((item: any) => item !== null);
        setState(stateValues);
      } else {
        setErr(!err);
      }
    };
    getStateData();
  }, []);
  const handleSelectedState: any = async (stateValue: string) => {
    setSelectedCity("");
    setCity([]);
    const getCitiesFromState: any = await FetchCitiesForAddressForm(
      stateValue,
      TokenFromStore?.token
    );
    console.log("cities values", getCitiesFromState);
    if (getCitiesFromState?.length > 0) {
      let citiesValues: any = getCitiesFromState
        .map((item: any) => item.name)
        .filter((item: any) => item !== null);

      console.log("cities values new", citiesValues);
      setCity(citiesValues);
    }
  };

  // const handlesubmit: any = (values: any, action: any) => {
  //   console.log("form values", values);
  //   dispatch(getRegistrationData(values));
  //   action.resetForm();
  // };


  const handlesubmit: any = async (values: any, action: any) => {
    let RegistrationApiRes: any = await RegistrationApi(values);
    // dispatch(getRegistrationData(values));
    if (RegistrationApiRes?.data?.message?.msg === "success") {
      showToast("Registerd sucessfully", "success");
      // dispatch(successmsg("Registerd sucessfully"));
      router.push("/login");
      // setTimeout(() => {
      //   dispatch(hideToast());
      // }, 1200);
    } else {
      showToast(RegistrationApiRes?.data?.message?.error);
      // dispatch(failmsg(RegistrationApiRes?.data?.message?.error));
      // setTimeout(() => {
      //   dispatch(hideToast());
      // }, 1200);
    }
    action.resetForm();
  };

  const HandleRegistrationForm: any = (details: any) => {
    if (details.label === "Name") {
      return selectedMultiLangData?.name;
    } else if (details.label === "Email") {
      return selectedMultiLangData?.email;
    } else if (details.label === "Mobile No") {
      return selectedMultiLangData?.mobile_number;
    } else if (details.label === "Flat No") {
      return selectedMultiLangData?.address_1;
    } else if (details.label === "Street / Road Name") {
      return selectedMultiLangData?.address_2;
    } else if (details.label === "GST Number") {
      return selectedMultiLangData?.gst;
    } else if (details.label === "State") {
      return selectedMultiLangData?.state;
    } else if (details.label === "City") {
      return selectedMultiLangData?.city;
    } else if (details.label === "Pincode") {
      return selectedMultiLangData?.postal_code;
    } else if (details.label === "Password") {
      return selectedMultiLangData?.password;
    } else if (details.label === "Confirm Password") {
      return selectedMultiLangData?.confirm_password;
    }
  };
  const togglePasswordVisibility = (fieldName: string) => {
    if (fieldName === 'password') {
      setIsPasswordRevealed(!isPasswordRevealed);
    } else if (fieldName === 'confirm_password') {
      setIsConfirmPasswordRevealed(!isConfirmPasswordRevealed);
    }
  };
  return (
    <>
      <div className="container ">
        <div className="row">
          <div className="col-12">
            <div className="logo mt-3">
              <Link href="/" className="navbar-brand">
                <Image
                  src={logoImg}
                  alt="logo"
                  width={250}
                  height={55}
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="registration_form">
          <div className="registr-heading text-center mb-2">
            <h1 className="text-uppercase registration_title color-black" >
              {selectedMultiLangData?.register}
            </h1>
          </div>
          <Formik
            initialValues={{
              name: "",
              email: "",
              contact: "",
              address_1: "",
              address_2: "",
              gst_number: "",
              city: "",
              state: "",
              postal_code: "",
              confirm_password: "",
            }}
            validationSchema={RegistrationValidation}
            onSubmit={(values, action) => {
              handlesubmit(values, action);
              action.resetForm();
            }}
          >
            {({ handleChange, handleBlur }) => (
              <FormikForm>
                <div className="form-wrapper registration">
                  <div className="mainfields-wrapper">
                    <div className="row justify-content-center">
                      <div className="col-10 main-column" >
                        {register_details.map((details: any, i) => (
                          <div className="row mt-3" key={i}>
                            <Form.Group controlId={details?.controlId}>
                              <div className="row ">
                                <div className="col-md-4">
                                  <Form.Label className="registration_label color-black bold" >
                                    {HandleRegistrationForm(details)}:
                                  </Form.Label>
                                </div>
                                {details?.name !== "state" &&
                                  details?.name !== "city" ? (
                                  <>
                                    <div className="col-md-8">
                                      <div className="input-group">
                                        <Field
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          // type={details?.type}
                                          type={
                                            details?.name === 'password'
                                              ? isPasswordRevealed
                                                ? 'text'
                                                : 'password'
                                              : details?.name === 'confirm_password'
                                                ? isConfirmPasswordRevealed
                                                  ? 'text'
                                                  : 'password'
                                                : 'text'
                                          }
                                          name={details?.name}
                                          placeholder={`Enter ${details?.label}`}
                                          className={`${details?.name === "address"
                                            ? "address_textarea"
                                            : ""
                                            } form-control rounded-0 `}

                                        />
                                        {
                                          details?.name === 'password' && (<span className="input-group-text px-4">
                                            {isPasswordRevealed ? (
                                              <i
                                                className="fa fa-eye visibility_icon"
                                                onClick={() => togglePasswordVisibility('password')}

                                              />
                                            ) : (
                                              <i
                                                className="fa fa-eye-slash visibility_icon"
                                                onClick={() => togglePasswordVisibility('password')}
                                              />
                                            )}
                                          </span>)
                                        }
                                        {
                                          details?.name === 'confirm_password' && (
                                            <span className="input-group-text px-4">
                                              { isConfirmPasswordRevealed ? (
                                                <i
                                                  className="fa fa-eye visibility_icon"
                                                  onClick={() => togglePasswordVisibility('confirm_password')}

                                                />
                                              ) : (
                                                <i
                                                  className="fa fa-eye-slash visibility_icon"
                                                  onClick={() => togglePasswordVisibility('confirm_password')}
                                                />
                                              )}
                                            </span>
                                          )
                                        }
                                      </div>

                                      <div className="error_message">
                                        <ErrorMessage
                                          className="error_message"
                                          name={details?.name}
                                        />
                                      </div>
                                    </div>

                                  </>

                                ) : (
                                  ""
                                )}
                                {details?.name === "state" && (
                                  <div className="col-md-8">
                                    <Field
                                      component="select"
                                      className="form-control rounded-0 "
                                      id="state"
                                      name="state"

                                      value={selectedStates}
                                      onBlur={handleBlur}
                                      onChange={(e: any) => {
                                        console.log(
                                          "selected state",
                                          e?.target?.value
                                        );
                                        setSelectedStates(e?.target?.value);
                                        handleSelectedState(e?.target?.value);
                                      }}
                                      onClick={handleChange}
                                    >
                                      <option>
                                        {
                                          selectedMultiLangData?.please_select_a_state
                                        }
                                      </option>
                                      {state?.length > 0 && (
                                        <>
                                          {state?.map(
                                            (data: any, index: any) => {
                                              return (
                                                <>
                                                  <option
                                                    value={data}
                                                    key={index}
                                                  >
                                                    {data}
                                                  </option>
                                                </>
                                              );
                                            }
                                          )}
                                        </>
                                      )}
                                    </Field>
                                  </div>
                                )}

                                {details?.name === "city" && (
                                  <div className="col-md-8" >
                                    <Field
                                      component="select"
                                      className="form-control rounded-0 "
                                      id="city"
                                      name="city"
                                      value={selectedCity}
                                      defaultValue=""
                                      onChange={(e: any) => {
                                        setSelectedCity(e.target.value);
                                        handleChange;
                                      }}
                                      onClick={handleChange}
                                      onBlur={handleBlur}
                                    >
                                      <option>
                                        {
                                          selectedMultiLangData?.please_select_a_city
                                        }
                                      </option>
                                      {city?.length > 0 && (
                                        <>
                                          {city.map((data: any, index: any) => (
                                            <option value={data} key={index}>
                                              {data}
                                            </option>
                                          ))}
                                        </>
                                      )}
                                    </Field>
                                  </div>
                                )}
                              </div>
                            </Form.Group>
                          </div>
                        ))}
                        <div className="row mt-2  d-flex justify-content-center text-center">
                          <div className="d-flex justify-content-center">
                            <div className="m-2">
                              <Link href="/login">
                                <button
                                  className={`btn bold text-uppercase  text-dark border-btn-back`}
                                >
                                  {selectedMultiLangData?.back}
                                </button>
                              </Link>
                            </div>
                            <div className="m-2">

                              <button
                                type="submit"
                                className="btn btn-warning text-uppercase bold button_color btn-color-submit"
                              >
                                {selectedMultiLangData?.submit}
                              </button>

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FormikForm>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Registration;