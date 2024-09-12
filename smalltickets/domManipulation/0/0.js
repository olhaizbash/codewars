import { galleryList } from "./galleryList.js";

const refs = {
  gallery: document.querySelector(".gallery"),
  form: document.querySelector(".add-image-form"),
  addBtn: document.querySelector(".add-btn"),
  addInput: document.querySelector(".form-input"),
  backdrop: document.querySelector(".backdrop"),
  prevBtn: document.querySelector(".btn-prev"),
  nextBtn: document.querySelector(".btn-next"),
  description: document.querySelector(".description"),
  bigImg: document.querySelector(".big-image"),
  buttons: document.querySelectorAll(".slider-btn"),
};

let activeImgIndex;

function createGalleryItemElements(elements) {
  return elements
    .map(
      (element) => `<li class="gallery__item">
  <a class="gallery__link" href="${element.src}">
    <img
      class="gallery__image"
      src="${element.src}"
      data-source="${element.src}"
      alt="${element.description}"
    />
  </a>
</li>`
    )
    .join("");
}

const openBackdrop = () => {
  refs.backdrop.classList.remove("is-hidden");
};
const closeBackdrop = () => {
  refs.backdrop.classList.add("is-hidden");
};

const setActiveImg = (img) => {
  activeImgIndex = galleryList.findIndex(
    (item) => item.src === img.src && item.description === img.description
  );
  console.log(activeImgIndex);
};

function onClick(event) {
  event.preventDefault();

  if (!event.target.classList.contains("gallery__image")) {
    return;
  }

  openBackdrop();
  refs.bigImg.setAttribute("src", event.target.dataset.source);
  refs.description.textContent = event.target.getAttribute("alt");
  let activeImg = {
    src: event.target.dataset.source,
    description: event.target.getAttribute("alt"),
  };
  setActiveImg(activeImg);
}

refs.form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const formDataObj = Object.fromEntries(formData);
  console.log(formDataObj);
  galleryList.push(formDataObj);
  refs.gallery.innerHTML = createGalleryItemElements(galleryList);

  refs.form.reset();
});

refs.gallery.innerHTML = createGalleryItemElements(galleryList);

refs.gallery.addEventListener("click", onClick);

refs.backdrop.addEventListener("click", (e) => {
  if (e.currentTarget === e.target) {
    closeBackdrop();
  }
});

refs.buttons.forEach((link) =>
  link.addEventListener("click", (e) => {
    const button = e.target.closest("button");
    if (!button) return;

    if (button.classList.contains("btn-prev")) {
      activeImgIndex =
        (activeImgIndex - 1 + galleryList.length) % galleryList.length;
      refs.bigImg.setAttribute("src", galleryList[activeImgIndex].src);
      refs.description.textContent = galleryList[activeImgIndex].description;
    }
    if (button.classList.contains("btn-next")) {
      activeImgIndex = (activeImgIndex + 1) % galleryList.length;
      refs.bigImg.setAttribute("src", galleryList[activeImgIndex].src);
      refs.description.textContent = galleryList[activeImgIndex].description;
    }
  })
);
