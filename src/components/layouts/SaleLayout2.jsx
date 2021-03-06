import { Divider } from "@mui/material";
import axios from "axios";
import Footer from "components/footer/Footer";
import Header from "components/header/Header";
import BabyFeeder from "components/icons/BabyFeeder";
import BasketBall from "components/icons/BasketBall";
import BeautyProducts from "components/icons/BeautyProducts";
import Camera from "components/icons/Camera";
import DrillMachine from "components/icons/DrillMachine";
import Picture from "components/icons/Picture";
import Sofa from "components/icons/Sofa";
import Tshirt from "components/icons/Tshirt";
import Watch from "components/icons/Watch";
import Wheel from "components/icons/Wheel";
import WomenDress from "components/icons/WomenDress";
import MobileNavigationBar from "components/mobile-navigation/MobileNavigationBar";
import SaleNavbar from "components/navbar/SaleNavbar";
import Sticky from "components/sticky/Sticky";
import Topbar from "components/topbar/Topbar";
import BackendManager from "globalManager/BackendManager";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { Fragment, useEffect } from "react";
import { useState } from "react";

const SaleLayout2 = ({
  csrfToken,
  providers,
  list,
  children,
  title = "XpressStors",
}) => {
  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Topbar />
      <Header list={list} providers={providers} csrfToken={csrfToken} />
      {/* <Divider /> */}

      <Sticky fixedOn={0}>
        <SaleNavbar saleCategoryList={list} />
      </Sticky>

      {/* <div className="section-after-sticky">{children}</div> */}

      {children}
      <MobileNavigationBar />
      <Footer />
    </Fragment>
  );
};

export default SaleLayout2;
