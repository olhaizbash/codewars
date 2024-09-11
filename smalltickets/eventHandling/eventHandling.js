const refs = {
  form: document.querySelector(".registration-form"),
  nameInput: document.querySelector("#name"),
  emailInput: document.querySelector("#email"),
  passwordInput: document.querySelector("#password"),
  submitBtn: document.querySelector(".submit-btn"),
};

refs.form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const formDataObj = Object.fromEntries(formData);
  console.log(formDataObj);

  refs.form.reset();
  refs.submitBtn.setAttribute("disabled", true);
});

refs.form.addEventListener(
  "focus",
  (e) => {
    if (e.target.tagName === "INPUT") {
      e.target.classList.remove("invalid");
    }
  },
  true
);

refs.form.addEventListener(
  "blur",
  (e) => {
    if (e.target.tagName === "INPUT") {
      const span = e.target.nextElementSibling;
      refs.submitBtn.setAttribute("disabled", false);
      const letters = /^[A-Za-z]+$/;
      const email = /^([^ ]+@[^ ]+\.[a-z]{2,6}|)$/;

      if (span && span.tagName === "SPAN") {
        span.innerHTML = "";
      }
      e.target.classList.remove("invalid");

      if (e.target.value === "") {
        e.target.classList.add("invalid");
        refs.submitBtn.setAttribute("disabled", true);
        if (span && span.tagName === "SPAN") {
          span.innerHTML = "This field is required";
        }
        return;
      }

      if (e.target === refs.nameInput && !e.target.value.match(letters)) {
        e.target.classList.add("invalid");
        if (span && span.tagName === "SPAN") {
          span.innerHTML = "This field should consist of only letters";
        }
        return;
      }

      if (e.target === refs.emailInput && !e.target.value.match(email)) {
        e.target.classList.add("invalid");
        if (span && span.tagName === "SPAN") {
          span.innerHTML = "Email is invalid. Use the format: test@gmail.com";
        }
        return;
      }

      checkFormValidity();
    }
  },
  true
);

function checkFormValidity() {
  const allInputs = [refs.nameInput, refs.emailInput, refs.passwordInput];

  const hasError = allInputs.some(
    (input) => input.classList.contains("invalid") || input.value === ""
  );

  if (hasError) {
    refs.submitBtn.setAttribute("disabled", true);
  } else {
    refs.submitBtn.removeAttribute("disabled");
  }
}
