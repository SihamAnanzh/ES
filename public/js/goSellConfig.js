function Checkout(customer, order, callbackurl) {
  goSell.config({
    containerID: "payment-root",
    gateway: {
      publicKey: "pk_test_EtHFV4BuPQokJT6jiROls87Y",
      merchantId: null,
      language: "en",
      contactInfo: true,
      supportedCurrencies: "all",
      supportedPaymentMethods: "all",
      saveCardOption: false,
      customerCards: true,
      notifications: "standard",
      callback: (response) => {
        console.log("response", response);
      },
      onClose: () => {
        console.log("onClose Event");
      },
      backgroundImg: {
        url: "imgURL",
        opacity: "0.5",
      },
      labels: {
        cardNumber: "Card Number",
        expirationDate: "MM/YY",
        cvv: "CVV",
        cardHolder: "Name on Card",
        actionButton: "Pay",
      },
      style: {
        base: {
          color: "#535353",
          lineHeight: "18px",
          fontFamily: "sans-serif",
          fontSmoothing: "antialiased",
          fontSize: "16px",
          "::placeholder": {
            color: "rgba(0, 0, 0, 0.26)",
            fontSize: "15px",
          },
        },
        invalid: {
          color: "red",
          iconColor: "#fa755a ",
        },
      },
    },
    customer: customer,
    order: order,
    transaction: {
      mode: "charge",
      charge: {
        saveCard: false,
        threeDSecure: true,
        description: customer.address,
        statement_descriptor: "Sample",
        reference: {
          transaction: "txn_0001",
          order: "ord_0001",
        },
        hashstring: "",
        metadata: {},
        receipt: {
          email: false,
          sms: false,
        },
        redirect: callbackurl,
        post: null,
      },
    },
  });
}
