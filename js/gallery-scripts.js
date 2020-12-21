import imgArray from './gallery-items.js';

let imgIndex;
let maxIndex = imgArray.length - 1;

const refs = {
    gallery: document.querySelector('.js-gallery'),
    modal: document.querySelector('.js-lightbox'),
    originalImg: document.querySelector('.lightbox__image'),
}

refs.gallery.addEventListener('click', onGalleryClick);
refs.modal.addEventListener('click', onModalClick);
window.addEventListener('keydown', onModalKeypress);

const createImg = (item, idx) => {

    const listItem = document.createElement('li');
    listItem.classList.add('gallery__item');

    const link = document.createElement('a');
    link.classList.add('gallery__link');
    link.setAttribute('href', item.original);

    const img = document.createElement('img');
    img.classList.add('gallery__image', 'js-gallery__image');
    img.setAttribute('src', item.preview);
    img.setAttribute('alt', item.description);
    img.setAttribute('data-source', idx);

    link.appendChild(img);
    listItem.appendChild(link);

    return listItem;
}
const createGallegy = currentArray => currentArray.map((item, idx) => createImg(item, idx));

function onGalleryClick(event) {
    event.preventDefault();

    const imgRef = event.target;
    const linkRef = imgRef.parentNode;

    imgIndex = Number(imgRef.dataset.source);



    if (imgRef.nodeName !== 'IMG') {
        return;
    }

    refs.modal.classList.add('is-open');
    refs.originalImg.src = linkRef;
}

function onModalClick(event) {
    const imgRef = event.target;

    if (imgRef.nodeName !== 'IMG' && imgRef.dataset.action !== 'right-lightbox' && imgRef.dataset.action !== 'left-lightbox') {
        onCloseModal();
    }

    if (imgRef.dataset.action === 'right-lightbox') {
        imgIndex = imgIndex === maxIndex ? 0 : imgIndex + 1;

        refs.originalImg.src = imgArray[imgIndex].original;
    }

    if (imgRef.dataset.action === 'left-lightbox') {
        imgIndex = imgIndex === 0 ? maxIndex : imgIndex - 1;

        refs.originalImg.src = imgArray[imgIndex].original;
    }
}
function onModalKeypress(event) {
    if (event.code === 'Escape') {
        onCloseModal();
    }

    if (event.code === 'ArrowRight') {
        imgIndex = imgIndex === maxIndex ? 0 : imgIndex + 1;

        refs.originalImg.removeAttribute('src');
        refs.originalImg.src = imgArray[imgIndex].original;
    }
    if (event.code === 'ArrowLeft') {
        imgIndex = imgIndex === 0 ? maxIndex : imgIndex - 1;

        refs.originalImg.removeAttribute('src');
        refs.originalImg.src = imgArray[imgIndex].original;
    }
}

function onCloseModal() {
    refs.modal.classList.remove('is-open');
    refs.originalImg.removeAttribute('src');
}

refs.gallery.append(...createGallegy(imgArray));
