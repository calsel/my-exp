const filterItems = document.querySelectorAll(".cars-filter li");
const carItems = document.querySelectorAll(".car");
const carsContent = document.getElementById("cars-content");
filterItems.forEach((item) => {
  item.onclick = () => {
    filterItems.forEach((el) => el.classList.remove("is-active"));
    item.classList.add("is-active");

    const filterText = item.textContent.toLowerCase();

    carItems.forEach((car) => {
      if (
        filterText === "все марки" ||
        car.querySelector("h4").textContent.toLowerCase().includes(filterText)
      ) {
        car.style.display = "flex";
      } else {
        car.style.display = "none";
      }
    });

    carsContent.scrollIntoView({ behavior: "smooth" });
  };
});

// Находим элементы ДО обработчика клика
const orderButton = document.getElementById("order-action");
const fields = [
  document.getElementById("car"),
  document.getElementById("name"),
  document.getElementById("phone"),
];

orderButton.addEventListener("click", function () {
  let isValid = true;

  // Проходимся циклом по всем полям
  fields.forEach((field) => {
    let isFieldValid = false;

    if (field.id === "phone") {
      const phoneRegex = /^[\d\s\-\+\(\)]+$/;
      const phoneValue = field.value.trim();
      // Проверяем: не пустое, соответствует regex И состоит минимум из 10 символов
      isFieldValid =
        phoneValue &&
        phoneRegex.test(phoneValue) &&
        phoneValue.replace(/\D/g, "").length >= 10;
    } else {
      // Для полей car и name - просто проверка на наличие текста
      isFieldValid = field.value.trim();
    }

    field.style.borderColor = isFieldValid ? "white" : "red";
    if (!isFieldValid) isValid = false;
  });

  // Если форма валидна
  if (isValid) {
    alert("Спасибо за заявку! Мы скоро свяжемся с вами");
    fields.forEach((field) => {
      field.value = "";
      field.style.borderColor = "white";
    });
  }
});
