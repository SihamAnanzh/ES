import NavbarLayout from "components/layouts/NavbarLayout";

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import BackendManager from "../../src/globalManager/BackendManager";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import TelecomIntro from "../../src/components/product-cards/TelecomIntro";
import Head from "next/head";

// ===============================================================
const ProductDetails = ({ data }) => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(data);
  const [selectedOption, setSelectedOption] = useState(0);

  const handleOptionClick = (_, newValue) => {
    setSelectedOption(newValue);
  };

  console.log(data);
  return (
    <NavbarLayout>
      <Head>
        <title>{data.serviceName}</title>
      </Head>
      {data && (
        <TelecomIntro
          serviceCode={data.serviceCode}
          imgGroup={data.imageUrl}
          title={data.serviceName}
          id={data.serviceID}
          mainCatigory={data.serCategory}
          items={data.denominations}
          serviceType={data.serviceType}
        />
      )}
    </NavbarLayout>
  );
};

export default ProductDetails;

export async function getServerSideProps(context) {
  const id = context.query.id;
  const { locale } = context;
  let data = await BackendManager.getOgCatgeroyById(id, locale);

  return {
    props: { data, ...(await serverSideTranslations(locale, ["common"])) },
  };
}
