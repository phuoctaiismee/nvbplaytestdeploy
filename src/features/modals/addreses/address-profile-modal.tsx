"use client";
import React, {
  useEffect,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { ButtonSubmitPrimary } from '@/components/base-components/buttons';
import SelectInput from '@/components/base-components/input/select-input';
import TextInput from '@/components/base-components/input/text-input';
import Modal from '@/components/base-components/modal';
import RadioCard from '@/components/base-components/radios';
import { Checkbox } from '@/components/ui/checkbox';
import {
  useGetMutationCreateAllCities,
  useGetMutationCreateAllDistricts,
  useGetMutationCreateAllWards,
  useMutationCreateAddreses,
} from '@/hooks/queries/addresses';
import {
  REGEXS,
  useFormValidator,
} from '@/hooks/validators';
import { RootState } from '@/stores';
import {
  setAddressCreateFormData,
  setAddressCreateIsDefault,
  setProvinceSelectedCreate,
} from '@/stores/address-slice';
import { setAddressModal } from '@/stores/profile';
import { useSpamGuard } from '@/utilities/spam';
import { translate } from '@/utilities/translator';

const AddressProfileModal = () => {
  const {addressModal} = useSelector((state: RootState) => state.profile);
  const {
    isDefaultAddressCreate,
    provinceSelectedCreate,
    citiesCreate,
    districtsCreate,
    wardsCreate,
  } = useSelector((state: RootState) => state.address);
  const {createFnc, isPending, isSuccess} = useMutationCreateAddreses();
  const {getCities} = useGetMutationCreateAllCities();
  const {getDistrictFnc} = useGetMutationCreateAllDistricts();
  const {getWardFnc} = useGetMutationCreateAllWards();
  const [allowCreate, setAllowCreate] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (addressModal) {
      getCities();
    }
  }, [addressModal]);

  const checkSpam = useSpamGuard();

  const {values, handleChange, errors, validateAllFields} = useFormValidator(
    {
      name: "",
      phone: "",
      houseNumber: "",
      province: "",
      district: "",
      ward: "",
      type: "house",
    },
    {
      name: {
        required: true,
        minLength: 3,
        maxLength: 50,
        errorMessage:
          translate("please_enter_name") +
          " & " +
          translate("must_be_greater_than_3_characters_long"),
      },
      phone: {
        required: true,
        minLength: 10,
        maxLength: 10,
        pattern: REGEXS.phone,
        errorMessage: translate("the_phone_number_is_invalid"),
      },
      houseNumber: {
        maxLength: 120,
        errorMessage: translate("please_enter_house_number_building_street"),
      },
      province: {
        required: true,
        minLength: 3,
        errorMessage: translate("please_select_province_city"),
      },
      district: {
        required: true,
        minLength: 3,
        errorMessage: translate("please_select_a_district"),
      },
      ward: {
        required: true,
        errorMessage: translate("please_select_commune_ward"),
      },
      type: {
        errorMessage: translate("please_select_an_address_type"),
      },
    }
  );
  useEffect(() => {
    if (validateAllFields()) {
      setAllowCreate(true);
    } else {
      setAllowCreate(false);
    }
  }, [values]);

  const handleNewAddress = async () => {
    if (!validateAllFields()) {
      return;
    }
    if (!checkSpam()) return;
    const formData = {
      first_name: values?.name,
      last_name: "",
      phone: values.phone,
      company: "",
      address_1: `${values.houseNumber}`,
      address_2: "",
      city: values.province,
      country_code: "vn",
      province: values.district,
      postal_code: "",
      address_name: values.name,
      is_default_shipping: isDefaultAddressCreate,
      is_default_billing: false,
      metadata: {
        city_id: citiesCreate.find(
          (city: any) => city.label === values.province
        )?.id,
        district_id: districtsCreate.find(
          (district: any) => district.label === values.district
        )?.id,
        ward_id: wardsCreate.find((ward: any) => ward.label === values.ward)
          ?.id,
        type: values.type,
      },
    };
    dispatch(setAddressCreateFormData(formData));
    createFnc();
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setAddressCreateIsDefault(false));
      dispatch(setAddressModal(false));
      setAllowCreate(false);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (provinceSelectedCreate) {
      getDistrictFnc();
    }
  }, [provinceSelectedCreate]);

  const handleSelectProvinceChange = (item: any) => {
    dispatch(setProvinceSelectedCreate(item));
    getDistrictFnc();
  };
  const handleSelectDistrictChange = (item: any) => {
    getWardFnc(item.id);
  };

  return (
    <Modal
      wrapperClass="!z-[49]"
      title="Thêm địa chỉ khác"
      size="sm"
      titleClass="text-txt-primary font-semibold text-center"
      open={addressModal}
      onClose={() => dispatch(setAddressModal(false))}
      footerModalClass="flex justify-end"
      bodyClass="text-sm"
      cancelButton={
        <ButtonSubmitPrimary
          className="bg-gray-primary hover:bg-gray-primary text-txtprimary !w-fit"
          onClickHandle={() => dispatch(setAddressModal(false))}
        >
          {translate("cancel")}
        </ButtonSubmitPrimary>
      }
      submitButton={
        <ButtonSubmitPrimary
          className={`bg-txtthird hover:bg-txtthird !w-fit ${!allowCreate && "cursor-not-allowed "}`}
          onClickHandle={() => handleNewAddress()}
          isLoading={isPending}
          disabled={isPending || !allowCreate}
        >
          {translate("confirm")}
        </ButtonSubmitPrimary>
      }
    >
      <div className="grid grid-cols-1 desktop:grid-cols-2 gap-3 w-full">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-txtfifth">
            {translate("full_name")}
          </span>
          <TextInput
            type="text"
            className="!h-10 bg-gray-primary "
            placeholder={translate("full_name_of_recipient")}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          {errors.name && (
            <span className="text-red-500 text-xs">{errors.name}</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-txtfifth">
            {translate("phone_number")}
          </span>
          <TextInput
            type="number"
            className="!h-10 bg-gray-primary "
            placeholder={translate("enter_phone_number")}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
          {errors.phone && (
            <span className="text-red-500 text-xs">{errors.phone}</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-txtfifth">
            {translate("house_number")}
          </span>
          <TextInput
            type="text"
            className="!h-10 bg-gray-primary "
            placeholder={translate(
              "house_number_for_example_no_1_nguyen_street"
            )}
            onChange={(e) => handleChange("houseNumber", e.target.value)}
          />
          {errors.houseNumber && (
            <span className="text-red-500 text-xs">{errors.houseNumber}</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-txtfifth">
            {translate("province_city")}
          </span>
          <SelectInput
            className="min-h-10"
            placeholder={translate("select_province_city")}
            options={citiesCreate || []}
            onSelect={(val) => {
              handleSelectProvinceChange(val);
              handleChange("province", val.label);
            }}
          />
          {errors.province && (
            <span className="text-red-500 text-xs">{errors.province}</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-txtfifth">
            {translate("district")}
          </span>

          <SelectInput
            className="min-h-10"
            placeholder={translate("select_district_district")}
            options={districtsCreate || []}
            onSelect={(val) => {
              handleSelectDistrictChange(val);
              handleChange("district", val.label);
            }}
          />
          {errors.district && (
            <span className="text-red-500 text-xs">{errors.district}</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-txtfifth">
            {translate("ward_commune")}
          </span>
          <SelectInput
            className="min-h-10"
            placeholder={translate("select_ward_commune")}
            options={wardsCreate || []}
            onSelect={(val) => {
              handleChange("ward", val.label);
            }}
          />
          {errors.ward && (
            <span className="text-red-500 text-xs">{errors.ward}</span>
          )}
        </div>
        <div className="flex flex-col col-span-1 desktop:col-span-2 gap-1">
          <span className="text-sm font-medium text-txtfifth">
            {translate("address_type")}
          </span>
          <div className="gap-3 flex items-center">
            <RadioCard
              id={"house"}
              name={"type"}
              isChecked={values.type == "house"}
              handleEdit={() => handleChange("type", "house")}
              className="w-fit h-[37px] px-4 py-0 flex items-center justify-center"
            >
              {translate("house")}
            </RadioCard>
            <RadioCard
              id={"office"}
              name={"type"}
              isChecked={values.type == "office"}
              handleEdit={() => handleChange("type", "office")}
              className="w-fit h-[37px] px-4 py-0 flex items-center justify-center"
            >
              {translate("office")}
            </RadioCard>
          </div>
        </div>
        <label
          htmlFor="default-address"
          className="flex col-span-1 desktop:col-span-2 gap-3 cursor-pointer select-none w-fit"
        >
          <Checkbox
            id="default-address"
            checked={isDefaultAddressCreate}
            className="w-5 h-5 bg-gray-primary border rounded-md border-gray-border data-[state=checked]:bg-txtprimary"
            onCheckedChange={(checked: boolean) =>
              dispatch(setAddressCreateIsDefault(checked))
            }
          />
          <span className="text-sm font-medium text-txtfifth">
            {translate("set_as_default_address")}
          </span>
        </label>
      </div>
    </Modal>
  );
};

export default AddressProfileModal;
