declare global {
  var mongoose: {
    conn: any;
    promise: any;
    recaptchaVerifier: any;
    confirmationResult: any;
  };
}

export {};
