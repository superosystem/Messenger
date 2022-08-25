export default {
  registration(detail) {
    return new Promise((resolve, reject) => {
      detail.emailAddress === "test@test.comm"
        ? resolve({ result: "success" })
        : reject(new Error("User already exist"));
    });
  },
};
